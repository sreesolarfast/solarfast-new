import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsSummaryComponent } from './installments-summary.component';

describe('InstallmentsSummaryComponent', () => {
  let component: InstallmentsSummaryComponent;
  let fixture: ComponentFixture<InstallmentsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallmentsSummaryComponent]
    });
    fixture = TestBed.createComponent(InstallmentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
