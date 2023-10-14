import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosesolarfastsystemComponent } from './choosesolarfastsystem.component';

describe('ChoosesolarfastsystemComponent', () => {
  let component: ChoosesolarfastsystemComponent;
  let fixture: ComponentFixture<ChoosesolarfastsystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosesolarfastsystemComponent]
    });
    fixture = TestBed.createComponent(ChoosesolarfastsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
