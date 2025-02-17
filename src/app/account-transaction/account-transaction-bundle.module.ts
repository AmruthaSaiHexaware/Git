import {NgModule} from "@angular/core";
import {
  ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
  AccountsCommunicationService,
  AccountsTransactionsJourneyModule
} from "@backbase/accounts-transactions-journey-ang";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

export const getBasePath = (servicePath: string) => `${environment.apiRoot}/${servicePath}`;


const journeyProviders = [
  {
    provide: AccountsCommunicationService,
    useValue: class AccountsCommunicationService {
      constructor(private router: Router) {}

      navigateToExternalAccountDetails(navigationInfo: { id: string; kind: string }) {
        this.router.navigateByUrl(`external-page;kind=${navigationInfo.kind};account=${navigationInfo.id}`);
      }
    },
  },
  {
    provide: ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
    useValue: getBasePath('transaction-manager'),
  },
  {
    provide: ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
    useValue: getBasePath('arrangement-manager'),
  },
  {
    provide: ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    useValue: getBasePath('financial-institution-manager'),
  },
  {
    provide: ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
    useValue: getBasePath('batch-manager'),
  },
  {
    provide: ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
    useValue: getBasePath('transaction-category-collector'),
  },
  {
    provide: ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
    useValue: getBasePath('messages-service'),
  },
  {
    provide: ACCOUNTS_TRANSACTIONS_JOURNEY_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
    useValue: getBasePath('external-account-aggregator'),
  },
];

@NgModule({
  imports: [
    AccountsTransactionsJourneyModule.forRoot({})
  ],
  providers: journeyProviders
})
export class AccountTransactionBundleModule {

}
