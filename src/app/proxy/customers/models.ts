import type { CustomerSex } from './customer-sex.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CustomerCreateDto {
  name: string;
  surName: string;
  maidenName?: string;
  birthPlace: string;
  birthDay?: string;
  identityNo: string;
  nationality: string;
  sex: CustomerSex;
}

export interface CustomerDto extends FullAuditedEntityDto<string> {
  name: string;
  surName: string;
  maidenName?: string;
  birthPlace: string;
  birthDay?: string;
  identityNo: string;
  nationality: string;
  sex: CustomerSex;
  concurrencyStamp?: string;
}

export interface CustomerExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  surName?: string;
  maidenName?: string;
  birthPlace?: string;
  birthDayMin?: string;
  birthDayMax?: string;
  identityNo?: string;
  nationality?: string;
  sex?: CustomerSex;
}

export interface CustomerUpdateDto {
  name: string;
  surName: string;
  maidenName?: string;
  birthPlace: string;
  birthDay?: string;
  identityNo: string;
  nationality: string;
  sex: CustomerSex;
  concurrencyStamp?: string;
}

export interface GetCustomersInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  surName?: string;
  maidenName?: string;
  birthPlace?: string;
  birthDayMin?: string;
  birthDayMax?: string;
  identityNo?: string;
  nationality?: string;
  sex?: CustomerSex;
}
