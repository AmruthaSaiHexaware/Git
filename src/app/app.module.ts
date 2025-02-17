import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EntitlementsModule,} from '@backbase/foundation-ang/entitlements';
import {AuthService, IdentityAuthModule} from '@backbase/identity-auth';
import {TransactionSigningModule} from '@backbase/identity-auth/transaction-signing';
import {AvatarModule} from '@backbase/ui-ang/avatar';
import {ButtonModule} from '@backbase/ui-ang/button';
import {DropdownMenuModule} from '@backbase/ui-ang/dropdown-menu';
import {IconModule} from '@backbase/ui-ang/icon';
import {LayoutModule} from '@backbase/ui-ang/layout';
import {LogoModule} from '@backbase/ui-ang/logo';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AuthConfig, OAuthModule, OAuthModuleConfig, OAuthService, OAuthStorage,} from 'angular-oauth2-oidc';
import {CookieService} from 'ngx-cookie-service';
import {authConfig, environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppErrorHandler} from './app.error-handler';
import {AuthEventsHandlerService} from './auth/auth-events-handler/auth-events-handler.service';
import {AuthInterceptor} from './auth/interceptor/auth.interceptor';
import {CARDS_BASE_PATH} from "@backbase/cards-http-ang";
import {ACCESS_CONTROL_BASE_PATH} from "@backbase/accesscontrol-http-ang";
import {ACCESS_CONTROL_BASE_PATH as ACCESS_CONTROL_BASE_PATH_V3 } from "@backbase/accesscontrol-v3-http-ang";
import {UserContextInterceptor} from "./user-context/user-context.interceptor";
import {ApiSandboxInterceptor} from "./auth/api-sandbox/api-sandbox.interceptor";
import { USER_BASE_PATH } from '@backbase/user-http-ang';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropdownMenuModule,
    IconModule,
    LayoutModule,
    LogoModule,
    NgbDropdownModule,
    AvatarModule,
    EntitlementsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    OAuthModule.forRoot(),
    ButtonModule,
    IdentityAuthModule,
    TransactionSigningModule
  ],
  providers: [
    ...(environment.mockProviders || []),
    { provide: AuthConfig, useValue: authConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiSandboxInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserContextInterceptor,
      multi: true,
    },
    {
      provide: OAuthModuleConfig,
      useValue: {
        resourceServer: {
          allowedUrls: [environment.apiRoot],
          sendAccessToken: true,
        },
      },
    },
    { provide: OAuthStorage, useFactory: () => localStorage },
    environment.mockEnabled
      ? []
      : {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [
            OAuthService,
            CookieService,
            AuthEventsHandlerService,
            AuthService,
          ],
          useFactory:
            (oAuthService: OAuthService, cookieService: CookieService) =>
            async () => {
              // Remove this if auth cookie is not needed for the app
              oAuthService.events.subscribe(({ type }) => {
                if (type === 'token_received' || type === 'token_refreshed') {
                  // Set the cookie on the app domain
                  cookieService.set(
                    'Authorization',
                    `Bearer ${oAuthService.getAccessToken()}`
                  );
                }
              });

              await oAuthService.loadDiscoveryDocumentAndTryLogin();
            },
        },
    {
      provide: USER_BASE_PATH,
      useValue: environment.apiRoot + '/user-manager',
    },
    {
      provide: CARDS_BASE_PATH,
      useValue: environment.apiRoot + '/cards-presentation-service',
    },
    {
      provide: ACCESS_CONTROL_BASE_PATH,
      useValue: environment.apiRoot + '/access-control',
    },
    {
      provide: ACCESS_CONTROL_BASE_PATH_V3,
      useValue: environment.apiRoot + '/access-control',
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
