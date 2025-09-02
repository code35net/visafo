import type { CommunicationType } from '../customers/communication-type.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ContactInfoCreateDto {
  type: CommunicationType;
  name: string;
}

export interface ContactInfoDto extends FullAuditedEntityDto<string> {
  type: CommunicationType;
  name: string;
}

export interface ContactInfoUpdateDto {
  type: CommunicationType;
  name: string;
}

export interface GetContactInfoListInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  customerId: string;
}

export interface GetContactInfosInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  type?: CommunicationType;
  name?: string;
  customerId: string;
}
