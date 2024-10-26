import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxHelpComponent } from './tax-help.component';

describe('TaxHelpComponent', () => {
  let component: TaxHelpComponent;
  let fixture: ComponentFixture<TaxHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
