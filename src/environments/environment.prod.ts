import { Environment } from '@abp/ng.core';

const baseUrl = 'https://app.visaflow.tr';

const oAuthConfig = {
  //issuer: 'https://auth-visaflow-f4aqbee2c4awguhz.westeurope-01.azurewebsites.net/',//'https://auth.visaflow.tr/',
  issuer: 'https://auth.visaflow.tr/',
  redirectUri: baseUrl,
  clientId: 'VisaFlowApp_App',
  responseType: 'code',
  scope: 'offline_access VisaFlowApp',
  requireHttps: true,
  impersonation: {
    tenantImpersonation: true,
    userImpersonation: true,
  }
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'VisaFlowApp',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://api-visaflow-f3gga0bwawh9hten.westeurope-01.azurewebsites.net/',//'https://api.visaflow.tr',
      rootNamespace: 'CODE35.VisaFlowApp',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  }
  // ,
  // remoteEnv: {
  //   url: '/getEnvConfig',
  //   mergeStrategy: 'deepmerge'
  // }
} as Environment;
