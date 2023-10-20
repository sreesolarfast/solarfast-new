import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionProdcutionChartComponent } from './consumptionprodcutionchart.component';

describe('ConsumptionprodcutionchartComponent', () => {
  let component: ConsumptionProdcutionChartComponent;
  let fixture: ComponentFixture<ConsumptionProdcutionChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumptionProdcutionChartComponent]
    });
    fixture = TestBed.createComponent(ConsumptionProdcutionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
