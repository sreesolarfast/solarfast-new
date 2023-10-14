import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosensystemComponent } from './choosensystem.component';

describe('ChoosensystemComponent', () => {
  let component: ChoosensystemComponent;
  let fixture: ComponentFixture<ChoosensystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosensystemComponent]
    });
    fixture = TestBed.createComponent(ChoosensystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
