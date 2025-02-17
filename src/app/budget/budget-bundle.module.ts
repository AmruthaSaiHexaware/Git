import {NgModule} from "@angular/core";
import {
    BudgetJourneyModule,
    BudgetJourneyConfiguration, // Add this line
    BudgetJourneyConfigurationToken, // Add this line
} from "@backbase/budget-journey-ang";

@NgModule({
    imports: [
        BudgetJourneyModule.forRoot()
    ],
    // Add the following object
    providers: [
        {
            provide: BudgetJourneyConfigurationToken,
            useValue: <Partial<BudgetJourneyConfiguration>>{
                showPercentage: true, //this is the configuration we are changing
                budgetSafeZoneLimit: 80,
                notificationDismissTime: 5,
                maxBudgets: undefined,
            },
        },
    ]
})
export class BudgetJourneyBundleModule {

}