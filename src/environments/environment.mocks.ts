import { Provider } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { Environment } from './type';

const mockProviders: Provider[] = [];

export const environment: Environment = {
  production: false,
  apiRoot: '/api',
  mockProviders,
  locales: ['en-US', 'nl-NL'],
  common: {
    designSlimMode: false,
  },
  mockEnabled: true,
};

export const authConfig: AuthConfig = {
  requireHttps: false,
  showDebugInformation: true,
  logoutUrl: document.baseURI + 'logout',
};
