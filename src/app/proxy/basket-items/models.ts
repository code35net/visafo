import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ProductDto } from '../products/models';
import type { CurrencyDto } from '../currencies/models';
import type { SourceDto } from '../sources/models';

export interface BasketItemCreateDto {
  amount: number;
  piece: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
}

export interface BasketItemDto extends FullAuditedEntityDto<string> {
  amount: number;
  piece: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
}

export interface BasketItemUpdateDto {
  amount: number;
  piece: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
}

export interface BasketItemWithNavigationPropertiesDto {
  basketItem: BasketItemDto;
  product: ProductDto;
  currency: CurrencyDto;
  source: SourceDto;
}

export interface GetBasketItemListInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  basketId: string;
}

export interface GetBasketItemsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  amountMin?: number;
  amountMax?: number;
  pieceMin?: number;
  pieceMax?: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
  basketId: string;
}
