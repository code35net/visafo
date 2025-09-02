import type {
  GetVisaListInput,
  GetVisasInput,
  VisaCreateDto,
  VisaDto,
  VisaUpdateDto,
} from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AppFileDescriptorDto, DownloadTokenResultDto, GetFileInput } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  apiName = 'Default';

  create = (input: VisaCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VisaDto>(
      {
        method: 'POST',
        url: '/api/app/visas',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/visas/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VisaDto>(
      {
        method: 'GET',
        url: `/api/app/visas/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/visas/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/visas/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetVisasInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VisaDto>>(
      {
        method: 'GET',
        url: '/api/app/visas',
        params: {
          applicationId: input.applicationId,
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          startDateMin: input.startDateMin,
          startDateMax: input.startDateMax,
          validDateMin: input.validDateMin,
          validDateMax: input.validDateMax,
          visaStatus: input.visaStatus,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getListByApplicationId = (input: GetVisaListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VisaDto>>(
      {
        method: 'GET',
        url: '/api/app/visas/by-application',
        params: {
          applicationId: input.applicationId,
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: VisaUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VisaDto>(
      {
        method: 'PUT',
        url: `/api/app/visas/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/visas/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
