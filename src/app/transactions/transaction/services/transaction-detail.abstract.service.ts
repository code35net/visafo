import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import { paymentTypeOptions } from '../../../proxy/transactions/payment-type.enum';
import type { TransactionWithNavigationPropertiesDto } from '../../../proxy/transactions/models';
import { TransactionService } from '../../../proxy/transactions/transaction.service';

export abstract class AbstractTransactionDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(TransactionService);
  public readonly list = inject(ListService);

  public readonly getCurrencyLookup = this.proxyService.getCurrencyLookup;

  public readonly getBasketLookup = this.proxyService.getBasketLookup;

  paymentTypeOptions = paymentTypeOptions;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    const formValues = {
      ...this.form.value,
    };

    if (this.selected) {
      return this.proxyService.update(this.selected.transaction.id, {
        ...formValues,
        concurrencyStamp: this.selected.transaction.concurrencyStamp,
      });
    }

    return this.proxyService.create(formValues);
  }

  buildForm() {
    const { amount, mainAmount, exchangeRate, isExpense, paymentType, currencyId, basketId } =
      this.selected?.transaction || {};

    this.form = this.fb.group({
      amount: [amount ?? null, []],
      mainAmount: [mainAmount ?? null, []],
      exchangeRate: [exchangeRate ?? null, []],
      isExpense: [isExpense ?? false, []],
      paymentType: [paymentType ?? null, [Validators.required]],
      currencyId: [currencyId ?? null, []],
      basketId: [basketId ?? null, []],
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

  update(record: TransactionWithNavigationPropertiesDto) {
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
