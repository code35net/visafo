import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { PaymentType } from './payment-type.enum';
import type { CurrencyDto } from '../currencies/models';
import type { BasketDto } from '../baskets/models';

export interface GetTransactionsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  amountMin?: number;
  amountMax?: number;
  mainAmountMin?: number;
  mainAmountMax?: number;
  exchangeRateMin?: number;
  exchangeRateMax?: number;
  isExpense?: boolean;
  paymentType?: PaymentType;
  currencyId?: string;
  basketId?: string;
}

export interface TransactionCreateDto {
  amount?: number;
  mainAmount?: number;
  exchangeRate?: number;
  isExpense: boolean;
  paymentType: PaymentType;
  currencyId?: string;
  basketId?: string;
}

export interface TransactionDto extends FullAuditedEntityDto<string> {
  amount?: number;
  mainAmount?: number;
  exchangeRate?: number;
  isExpense: boolean;
  paymentType: PaymentType;
  currencyId?: string;
  basketId?: string;
  concurrencyStamp?: string;
}

export interface TransactionExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  amountMin?: number;
  amountMax?: number;
  mainAmountMin?: number;
  mainAmountMax?: number;
  exchangeRateMin?: number;
  exchangeRateMax?: number;
  isExpense?: boolean;
  paymentType?: PaymentType;
  currencyId?: string;
  basketId?: string;
}

export interface TransactionUpdateDto {
  amount?: number;
  mainAmount?: number;
  exchangeRate?: number;
  isExpense: boolean;
  paymentType: PaymentType;
  currencyId?: string;
  basketId?: string;
  concurrencyStamp?: string;
}

export interface TransactionWithNavigationPropertiesDto {
  transaction: TransactionDto;
  currency: CurrencyDto;
  basket: BasketDto;
}
