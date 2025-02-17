import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsManagementJourneyConfigService, CardsService, PaymentCard, PaymentCardGroup, PaymentCardType } from '@backbase/cards-management-journey-ang';


@Component({
  selector: 'bb-custom-cards-management-journey',
  templateUrl: './custom-cards-management-journey.component.html',
  styleUrls: ['./custom-cards-management-journey.component.scss'],
})
export class CustomCardsManagementJourneyComponent {
   /**
   * Payment cards, grouped by the `groupByPaymentCardTypes` configuration.
   */
   paymentCardGroups?: PaymentCardGroup[];
  
   ngOnInit(): void {
     this.cardsService.getCards().subscribe({
       next: (paymentCards) => {
         this.paymentCardGroups = this.groupCardsByType(
           paymentCards,
           this.configService.paymentCardTypes
         );
       },
       error: () => {       
       },
     });
   }
 
   selectedCard(id: string) {
     this.router.navigate(['../details', { selectedCard: id }], {
       relativeTo: this.route,
     });
   }
 
   onNavigateTravelNotice() {
     this.router.navigate(['../travel-notice'], { relativeTo: this.route });
   }
 
   onNavigateCreateCard() {
     this.router.navigate(['../create-new-card'], { relativeTo: this.route });
   }

   private filterCardsByType(
     paymentCards: PaymentCard[],
     paymentCardType: PaymentCardType
   ): PaymentCardGroup {
     return {
       type: paymentCardType.type,
       paymentCards: paymentCards.filter(
         (paymentCard): boolean => paymentCard.type === paymentCardType.type
       ),
       heading: paymentCardType.heading,
     };
   }
 
   private groupCardsByType(
     paymentCards: PaymentCard[],
     paymentCardTypes: PaymentCardType[]
   ): PaymentCardGroup[] {
     if (paymentCards.length === 0) return [];
 
     const groupedCards = paymentCardTypes.reduce(
       (group: PaymentCardGroup[], paymentCardType: PaymentCardType): PaymentCardGroup[] => {
         const paymentCardGroup = this.filterCardsByType(paymentCards, paymentCardType);
         return paymentCardGroup.paymentCards.length ? [...group, paymentCardGroup] : group;
       },
       []
     );
     return groupedCards.length ? groupedCards : [{ paymentCards }];
   }
 
   constructor(
     protected readonly router: Router,
     protected readonly route: ActivatedRoute,
     protected readonly cardsService: CardsService,
     readonly configService: CardsManagementJourneyConfigService,
   ) {}
}