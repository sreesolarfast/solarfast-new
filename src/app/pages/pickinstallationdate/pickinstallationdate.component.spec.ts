import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickinstallationdateComponent } from './pickinstallationdate.component';

describe('PickinstallationdateComponent', () => {
  let component: PickinstallationdateComponent;
  let fixture: ComponentFixture<PickinstallationdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickinstallationdateComponent]
    });
    fixture = TestBed.createComponent(PickinstallationdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
