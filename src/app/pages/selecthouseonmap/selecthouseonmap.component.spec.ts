import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecthouseonmapComponent } from './selecthouseonmap.component';

describe('SelecthouseonmapComponent', () => {
  let component: SelecthouseonmapComponent;
  let fixture: ComponentFixture<SelecthouseonmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelecthouseonmapComponent]
    });
    fixture = TestBed.createComponent(SelecthouseonmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
