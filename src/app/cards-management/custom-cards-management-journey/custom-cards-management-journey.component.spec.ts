import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomCardsManagementJourneyComponent } from './custom-cards-management-journey.component';

describe('CustomCardsManagementJourneyComponent', () => {
  let component: CustomCardsManagementJourneyComponent;
  let fixture: ComponentFixture<CustomCardsManagementJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomCardsManagementJourneyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCardsManagementJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
