import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CurrencyCreateDto {
  name: string;
  shorten: string;
  isMain?: string;
}

export interface CurrencyDto extends FullAuditedEntityDto<string> {
  name: string;
  shorten: string;
  isMain?: string;
  concurrencyStamp?: string;
}

export interface CurrencyExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  shorten?: string;
  isMain?: string;
}

export interface CurrencyUpdateDto {
  name: string;
  shorten: string;
  isMain?: string;
  concurrencyStamp?: string;
}

export interface GetCurrenciesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  shorten?: string;
  isMain?: string;
}
