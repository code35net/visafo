import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetProductListInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  productGroupId: string;
}

export interface GetProductsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  productGroupId: string;
}

export interface ProductCreateDto {
  name: string;
}

export interface ProductDto extends FullAuditedEntityDto<string> {
  name: string;
}

export interface ProductUpdateDto {
  name: string;
}
