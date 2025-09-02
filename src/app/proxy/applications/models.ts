import type { ApplicationStatus } from './application-status.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ApplicationCreateDto {
  refCode?: string;
  trackingCode?: string;
  notes?: string;
  reservationDate?: string;
  reservationTime?: string;
  isDocumented: boolean;
  applicationStatus: ApplicationStatus;
}

export interface ApplicationDto extends FullAuditedEntityDto<string> {
  refCode?: string;
  trackingCode?: string;
  notes?: string;
  reservationDate?: string;
  reservationTime?: string;
  isDocumented: boolean;
  applicationStatus: ApplicationStatus;
  concurrencyStamp?: string;
}

export interface ApplicationExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  refCode?: string;
  trackingCode?: string;
  notes?: string;
  reservationDateMin?: string;
  reservationDateMax?: string;
  reservationTimeMin?: string;
  reservationTimeMax?: string;
  isDocumented?: boolean;
  applicationStatus?: ApplicationStatus;
}

export interface ApplicationUpdateDto {
  refCode?: string;
  trackingCode?: string;
  notes?: string;
  reservationDate?: string;
  reservationTime?: string;
  isDocumented: boolean;
  applicationStatus: ApplicationStatus;
  concurrencyStamp?: string;
}

export interface GetApplicationsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  refCode?: string;
  trackingCode?: string;
  notes?: string;
  reservationDateMin?: string;
  reservationDateMax?: string;
  reservationTimeMin?: string;
  reservationTimeMax?: string;
  isDocumented?: boolean;
  applicationStatus?: ApplicationStatus;
}
