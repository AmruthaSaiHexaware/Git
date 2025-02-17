import {NgModule} from "@angular/core";
import {
  CardsManagementJourneyModule,
  CardsManagementJourneyConfiguration,
  CardsManagementJourneyConfigurationToken,
} from "@backbase/cards-management-journey-ang";

@NgModule({
imports: [
  CardsManagementJourneyModule.forRoot()
],
  providers: [
    {
      provide: CardsManagementJourneyConfigurationToken,
      useValue: <Partial<CardsManagementJourneyConfiguration>>{
        notificationTtl: 5000,
        groupByPaymentCardTypes: '',
        enableTravelNotice: false,
      },
    },
  ]
})
export class CardsManagementBundleModule {

}
