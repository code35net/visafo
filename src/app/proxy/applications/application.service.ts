import type {
  ApplicationCreateDto,
  ApplicationDto,
  ApplicationExcelDownloadDto,
  ApplicationUpdateDto,
  GetApplicationsInput,
} from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AppFileDescriptorDto, DownloadTokenResultDto, GetFileInput } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  apiName = 'Default';

  create = (input: ApplicationCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>(
      {
        method: 'POST',
        url: '/api/app/applications',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/applications/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  deleteAll = (input: GetApplicationsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/applications/all',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          refCode: input.refCode,
          trackingCode: input.trackingCode,
          notes: input.notes,
          reservationDateMin: input.reservationDateMin,
          reservationDateMax: input.reservationDateMax,
          reservationTimeMin: input.reservationTimeMin,
          reservationTimeMax: input.reservationTimeMax,
          isDocumented: input.isDocumented,
          applicationStatus: input.applicationStatus,
        },
      },
      { apiName: this.apiName, ...config },
    );

  deleteByIds = (applicationIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: '/api/app/applications',
        params: { applicationIds },
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>(
      {
        method: 'GET',
        url: `/api/app/applications/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/applications/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/applications/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetApplicationsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ApplicationDto>>(
      {
        method: 'GET',
        url: '/api/app/applications',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          refCode: input.refCode,
          trackingCode: input.trackingCode,
          notes: input.notes,
          reservationDateMin: input.reservationDateMin,
          reservationDateMax: input.reservationDateMax,
          reservationTimeMin: input.reservationTimeMin,
          reservationTimeMax: input.reservationTimeMax,
          isDocumented: input.isDocumented,
          applicationStatus: input.applicationStatus,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getListAsExcelFile = (input: ApplicationExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/applications/as-excel-file',
        params: {
          downloadToken: input.downloadToken,
          filterText: input.filterText,
          refCode: input.refCode,
          trackingCode: input.trackingCode,
          notes: input.notes,
          reservationDateMin: input.reservationDateMin,
          reservationDateMax: input.reservationDateMax,
          reservationTimeMin: input.reservationTimeMin,
          reservationTimeMax: input.reservationTimeMax,
          isDocumented: input.isDocumented,
          applicationStatus: input.applicationStatus,
        },
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: ApplicationUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>(
      {
        method: 'PUT',
        url: `/api/app/applications/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/applications/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
