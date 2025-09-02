import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import { customerSexOptions } from '../../../proxy/customers/customer-sex.enum';
import type { CustomerDto } from '../../../proxy/customers/models';
import { CustomerService } from '../../../proxy/customers/customer.service';

export abstract class AbstractCustomerDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(CustomerService);
  public readonly list = inject(ListService);

  customerSexOptions = customerSexOptions;

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
    const { name, surName, maidenName, birthPlace, birthDay, identityNo, nationality, sex } =
      this.selected || {};

    this.form = this.fb.group({
      name: [name ?? null, [Validators.required]],
      surName: [surName ?? null, [Validators.required]],
      maidenName: [maidenName ?? null, []],
      birthPlace: [birthPlace ?? null, [Validators.required]],
      birthDay: [birthDay ?? null, [Validators.required]],
      identityNo: [identityNo ?? null, [Validators.required]],
      nationality: [nationality ?? null, [Validators.required]],
      sex: [sex ?? null, [Validators.required]],
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

  update(record: CustomerDto) {
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
