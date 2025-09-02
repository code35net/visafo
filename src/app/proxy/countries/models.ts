import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CountryCreateDto {
  name: string;
}

export interface CountryDto extends FullAuditedEntityDto<string> {
  name: string;
  concurrencyStamp?: string;
}

export interface CountryUpdateDto {
  name: string;
  concurrencyStamp?: string;
}

export interface GetCountriesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
}
