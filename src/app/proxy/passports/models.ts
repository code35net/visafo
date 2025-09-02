import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetPassportListInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  customerId: string;
}

export interface GetPassportsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  number?: string;
  isMain?: boolean;
  startDateMin?: string;
  startDateMax?: string;
  validDateMin?: string;
  validDateMax?: string;
  issuedBy?: string;
  customerId: string;
}

export interface PassportCreateDto {
  number: string;
  isMain: boolean;
  startDate?: string;
  validDate?: string;
  issuedBy: string;
}

export interface PassportDto extends FullAuditedEntityDto<string> {
  number: string;
  isMain: boolean;
  startDate?: string;
  validDate?: string;
  issuedBy: string;
}

export interface PassportUpdateDto {
  number: string;
  isMain: boolean;
  startDate?: string;
  validDate?: string;
  issuedBy: string;
}
