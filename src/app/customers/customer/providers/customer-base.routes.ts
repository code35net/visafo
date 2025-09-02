import { ABP, eLayoutType } from '@abp/ng.core';

export const CUSTOMER_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/customers',
    iconClass: 'fas fa-file-alt',
    name: '::Menu:Customers',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.Customers',
    breadcrumbText: '::Customers',
  },
];
