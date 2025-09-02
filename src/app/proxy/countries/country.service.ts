import type { CountryCreateDto, CountryDto, CountryUpdateDto, GetCountriesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AppFileDescriptorDto, DownloadTokenResultDto, GetFileInput } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiName = 'Default';

  create = (input: CountryCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryDto>(
      {
        method: 'POST',
        url: '/api/app/countries',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/countries/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  deleteAll = (input: GetCountriesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/countries/all',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          name: input.name,
        },
      },
      { apiName: this.apiName, ...config },
    );

  deleteByIds = (countryIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/countries',
        params: { countryIds },
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryDto>(
      {
        method: 'GET',
        url: `/api/app/countries/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/countries/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/countries/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetCountriesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CountryDto>>(
      {
        method: 'GET',
        url: '/api/app/countries',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          name: input.name,
        },
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: CountryUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryDto>(
      {
        method: 'PUT',
        url: `/api/app/countries/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/countries/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
