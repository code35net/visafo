import type {
  ContactInfoCreateDto,
  ContactInfoDto,
  ContactInfoUpdateDto,
  GetContactInfoListInput,
  GetContactInfosInput,
} from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AppFileDescriptorDto, DownloadTokenResultDto, GetFileInput } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  apiName = 'Default';

  create = (input: ContactInfoCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactInfoDto>(
      {
        method: 'POST',
        url: '/api/app/contact-infos',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/contact-infos/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactInfoDto>(
      {
        method: 'GET',
        url: `/api/app/contact-infos/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/contact-infos/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/contact-infos/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetContactInfosInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ContactInfoDto>>(
      {
        method: 'GET',
        url: '/api/app/contact-infos',
        params: {
          customerId: input.customerId,
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          type: input.type,
          name: input.name,
        },
      },
      { apiName: this.apiName, ...config },
    );

  getListByCustomerId = (input: GetContactInfoListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ContactInfoDto>>(
      {
        method: 'GET',
        url: '/api/app/contact-infos/by-customer',
        params: {
          customerId: input.customerId,
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: ContactInfoUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContactInfoDto>(
      {
        method: 'PUT',
        url: `/api/app/contact-infos/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/contact-infos/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  constructor(private restService: RestService) {}
}
