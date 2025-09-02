import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetSourcesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  shortName?: string;
  fullName?: string;
  phone?: string;
  isOutsource?: boolean;
  isSupplier?: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
}

export interface SourceCreateDto {
  shortName: string;
  fullName: string;
  phone: string;
  isOutsource: boolean;
  isSupplier: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
}

export interface SourceDto extends FullAuditedEntityDto<string> {
  shortName: string;
  fullName: string;
  phone: string;
  isOutsource: boolean;
  isSupplier: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
  concurrencyStamp?: string;
}

export interface SourceExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  shortName?: string;
  fullName?: string;
  phone?: string;
  isOutsource?: boolean;
  isSupplier?: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
}

export interface SourceUpdateDto {
  shortName: string;
  fullName: string;
  phone: string;
  isOutsource: boolean;
  isSupplier: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
  concurrencyStamp?: string;
}
