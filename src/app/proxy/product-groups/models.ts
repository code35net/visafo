import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetProductGroupsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  isMain?: boolean;
}

export interface ProductGroupCreateDto {
  name: string;
  isMain: boolean;
}

export interface ProductGroupDto extends FullAuditedEntityDto<string> {
  name: string;
  isMain: boolean;
  concurrencyStamp?: string;
}

export interface ProductGroupExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  isMain?: boolean;
}

export interface ProductGroupUpdateDto {
  name: string;
  isMain: boolean;
  concurrencyStamp?: string;
}
