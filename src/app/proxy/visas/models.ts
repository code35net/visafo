import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { VisaStatus } from './visa-status.enum';

export interface GetVisaListInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  applicationId: string;
}

export interface GetVisasInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  startDateMin?: string;
  startDateMax?: string;
  validDateMin?: string;
  validDateMax?: string;
  visaStatus?: VisaStatus;
  applicationId: string;
}

export interface VisaCreateDto {
  startDate?: string;
  validDate?: string;
  visaStatus?: VisaStatus;
}

export interface VisaDto extends FullAuditedEntityDto<string> {
  startDate?: string;
  validDate?: string;
  visaStatus?: VisaStatus;
}

export interface VisaUpdateDto {
  startDate?: string;
  validDate?: string;
  visaStatus?: VisaStatus;
}
