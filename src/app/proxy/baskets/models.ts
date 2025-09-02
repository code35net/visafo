import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CustomerDto } from '../customers/models';

export interface BasketCreateDto {
  hasInvoice: boolean;
  isIssued: boolean;
  paymentDate?: string;
  applicationId?: string;
  customerId: string;
}

export interface BasketDto extends FullAuditedEntityDto<string> {
  hasInvoice: boolean;
  isIssued: boolean;
  paymentDate?: string;
  applicationId?: string;
  customerId: string;
  concurrencyStamp?: string;
}

export interface BasketExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  hasInvoice?: boolean;
  isIssued?: boolean;
  paymentDateMin?: string;
  paymentDateMax?: string;
  applicationId?: string;
  customerId?: string;
}

export interface BasketUpdateDto {
  hasInvoice: boolean;
  isIssued: boolean;
  paymentDate?: string;
  applicationId?: string;
  customerId: string;
  concurrencyStamp?: string;
}

export interface BasketWithNavigationPropertiesDto {
  basket: BasketDto;
  customer: CustomerDto;
}

export interface GetBasketsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  hasInvoice?: boolean;
  isIssued?: boolean;
  paymentDateMin?: string;
  paymentDateMax?: string;
  applicationId?: string;
  customerId?: string;
}
