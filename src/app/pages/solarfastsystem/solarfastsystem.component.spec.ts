import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarfastsystemComponent } from './solarfastsystem.component';

describe('SolarfastsystemComponent', () => {
  let component: SolarfastsystemComponent;
  let fixture: ComponentFixture<SolarfastsystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolarfastsystemComponent]
    });
    fixture = TestBed.createComponent(SolarfastsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
