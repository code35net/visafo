import type {
  CurrencyCreateDto,
  CurrencyDto,
  CurrencyExcelDownloadDto,
  CurrencyUpdateDto,
  GetCurrenciesInput,
} from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AppFileDescriptorDto, DownloadTokenResultDto, GetFileInput } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  apiName = 'Default';

  create = (input: CurrencyCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto>(
      {
        method: 'POST',
        url: '/api/app/currencies',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/currencies/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  deleteAll = (input: GetCurrenciesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/currencies/all',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          name: input.name,
          shorten: input.shorten,
          isMain: input.isMain,
        },
      },
      { apiName: this.apiName, ...config },
    );

  deleteByIds = (currencyIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/currencies',
        params: { currencyIds },
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto>(
      {
        method: 'GET',
        url: `/api/app/currencies/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/currencies/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/currencies/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetCurrenciesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CurrencyDto>>(
      {
        method: 'GET',
        url: '/api/app/currencies',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          name: input.name,
          shorten: input.shorten,
          isMain: input.isMain,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getListAsExcelFile = (input: CurrencyExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/currencies/as-excel-file',
        params: {
          downloadToken: input.downloadToken,
          filterText: input.filterText,
          name: input.name,
          shorten: input.shorten,
          isMain: input.isMain,
        },
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: CurrencyUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrencyDto>(
      {
        method: 'PUT',
        url: `/api/app/currencies/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/currencies/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
