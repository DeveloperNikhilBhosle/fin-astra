import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDataComponent } from './investment-data.component';

describe('InvestmentDataComponent', () => {
  let component: InvestmentDataComponent;
  let fixture: ComponentFixture<InvestmentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
