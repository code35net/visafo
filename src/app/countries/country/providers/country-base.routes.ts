import { ABP, eLayoutType } from '@abp/ng.core';

export const COUNTRY_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/countries',
    iconClass: 'fas fa-file-alt',
    name: '::Menu:Countries',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.Countries',
    breadcrumbText: '::Countries',
  },
];
