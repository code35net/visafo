import type {
  GetTransactionsInput,
  TransactionCreateDto,
  TransactionDto,
  TransactionExcelDownloadDto,
  TransactionUpdateDto,
  TransactionWithNavigationPropertiesDto,
} from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type {
  AppFileDescriptorDto,
  DownloadTokenResultDto,
  GetFileInput,
  LookupDto,
  LookupRequestDto,
} from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiName = 'Default';

  create = (input: TransactionCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>(
      {
        method: 'POST',
        url: '/api/app/transactions',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/transactions/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  deleteAll = (input: GetTransactionsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/transactions/all',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          amountMin: input.amountMin,
          amountMax: input.amountMax,
          mainAmountMin: input.mainAmountMin,
          mainAmountMax: input.mainAmountMax,
          exchangeRateMin: input.exchangeRateMin,
          exchangeRateMax: input.exchangeRateMax,
          isExpense: input.isExpense,
          paymentType: input.paymentType,
          currencyId: input.currencyId,
          basketId: input.basketId,
        },
      },
      { apiName: this.apiName, ...config },
    );

  deleteByIds = (transactionIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/transactions',
        params: { transactionIds },
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>(
      {
        method: 'GET',
        url: `/api/app/transactions/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getBasketLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>(
      {
        method: 'GET',
        url: '/api/app/transactions/basket-lookup',
        params: {
          filter: input.filter,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getCurrencyLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>(
      {
        method: 'GET',
        url: '/api/app/transactions/currency-lookup',
        params: {
          filter: input.filter,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/transactions/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/transactions/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetTransactionsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TransactionWithNavigationPropertiesDto>>(
      {
        method: 'GET',
        url: '/api/app/transactions',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          amountMin: input.amountMin,
          amountMax: input.amountMax,
          mainAmountMin: input.mainAmountMin,
          mainAmountMax: input.mainAmountMax,
          exchangeRateMin: input.exchangeRateMin,
          exchangeRateMax: input.exchangeRateMax,
          isExpense: input.isExpense,
          paymentType: input.paymentType,
          currencyId: input.currencyId,
          basketId: input.basketId,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getListAsExcelFile = (input: TransactionExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/transactions/as-excel-file',
        params: {
          downloadToken: input.downloadToken,
          filterText: input.filterText,
          amountMin: input.amountMin,
          amountMax: input.amountMax,
          mainAmountMin: input.mainAmountMin,
          mainAmountMax: input.mainAmountMax,
          exchangeRateMin: input.exchangeRateMin,
          exchangeRateMax: input.exchangeRateMax,
          isExpense: input.isExpense,
          paymentType: input.paymentType,
          currencyId: input.currencyId,
          basketId: input.basketId,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionWithNavigationPropertiesDto>(
      {
        method: 'GET',
        url: `/api/app/transactions/with-navigation-properties/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: TransactionUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>(
      {
        method: 'PUT',
        url: `/api/app/transactions/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/transactions/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
