import { Component, Input, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardsSelfServiceAdditionalDetailsContext, CardsServiceTopAdditionalDetailsComponent, PaymentCard } from '@backbase/cards-management-journey-ang';

@Component({
  selector: 'bb-custom-card-details-self-service-top',
  templateUrl: './custom-card-details-self-service-top.component.html',
  styleUrls: ['./custom-card-details-self-service-top.component.scss'],
})
export class CustomCardDetailsSelfServiceTopComponent implements CardsServiceTopAdditionalDetailsComponent, OnInit {
  @Input() context: CardsSelfServiceAdditionalDetailsContext | undefined;

  public readonly cardRenameForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.cardRenameForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Context:', this.context);
    if (this.context?.name) {
      this.cardRenameForm.controls['name'].setValue(this.context.cardName);
    }
  }

  rename() {
    const newName = this.cardRenameForm.value.name;
    console.log('Renaming to:', newName);
    if (this.context) {
      this.context.cardName = newName;
      console.log(this.context.cardName);
      console.log(this.context);
      
      // this.cdr.detectChanges(); 
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}
}
