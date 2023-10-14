import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentbillingsummaryComponent } from './installmentbillingsummary.component';

describe('InstallmentbillingsummaryComponent', () => {
  let component: InstallmentbillingsummaryComponent;
  let fixture: ComponentFixture<InstallmentbillingsummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallmentbillingsummaryComponent]
    });
    fixture = TestBed.createComponent(InstallmentbillingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
