import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionprodcutionchartComponent } from './consumptionprodcutionchart.component';

describe('ConsumptionprodcutionchartComponent', () => {
  let component: ConsumptionprodcutionchartComponent;
  let fixture: ComponentFixture<ConsumptionprodcutionchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionprodcutionchartComponent]
    });
    fixture = TestBed.createComponent(ConsumptionprodcutionchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
