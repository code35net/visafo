import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import { applicationStatusOptions } from '../../../proxy/applications/application-status.enum';
import type { ApplicationDto } from '../../../proxy/applications/models';
import { ApplicationService } from '../../../proxy/applications/application.service';

export abstract class AbstractApplicationDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(ApplicationService);
  public readonly list = inject(ListService);

  applicationStatusOptions = applicationStatusOptions;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    const formValues = {
      ...this.form.value,
    };

    if (this.selected) {
      return this.proxyService.update(this.selected.id, {
        ...formValues,
        concurrencyStamp: this.selected.concurrencyStamp,
      });
    }

    return this.proxyService.create(formValues);
  }

  buildForm() {
    const {
      refCode,
      trackingCode,
      notes,
      reservationDate,
      reservationTime,
      isDocumented,
      applicationStatus,
    } = this.selected || {};

    this.form = this.fb.group({
      refCode: [refCode ?? null, []],
      trackingCode: [trackingCode ?? null, []],
      notes: [notes ?? null, []],
      reservationDate: [reservationDate ?? null, []],
      reservationTime: [reservationTime ?? null, []],
      isDocumented: [isDocumented ?? false, []],
      applicationStatus: [applicationStatus ?? null, [Validators.required]],
    });
  }

  showForm() {
    this.buildForm();
    this.isVisible = true;
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: ApplicationDto) {
    this.selected = record;
    this.showForm();
  }

  hideForm() {
    this.isVisible = false;
  }

  submitForm() {
    if (this.form.invalid) return;

    this.isBusy = true;

    const request = this.createRequest().pipe(
      finalize(() => (this.isBusy = false)),
      tap(() => this.hideForm()),
    );

    request.subscribe(this.list.get);
  }

  changeVisible($event: boolean) {
    this.isVisible = $event;
  }
}
