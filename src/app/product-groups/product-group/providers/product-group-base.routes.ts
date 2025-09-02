import { ABP, eLayoutType } from '@abp/ng.core';

export const PRODUCT_GROUP_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/product-groups',
    iconClass: 'fas fa-file-alt',
    name: '::Menu:ProductGroups',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.ProductGroups',
    breadcrumbText: '::ProductGroups',
  },
];
