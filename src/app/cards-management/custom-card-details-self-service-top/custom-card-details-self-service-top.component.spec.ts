import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomCardDetailsSelfServiceTopComponent } from './custom-card-details-self-service-top.component';

describe('CustomCardDetailsSelfServiceTopComponent', () => {
  let component: CustomCardDetailsSelfServiceTopComponent;
  let fixture: ComponentFixture<CustomCardDetailsSelfServiceTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomCardDetailsSelfServiceTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCardDetailsSelfServiceTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
