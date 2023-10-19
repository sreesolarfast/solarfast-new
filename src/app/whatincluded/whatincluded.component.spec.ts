import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatincludedComponent } from './whatincluded.component';

describe('WhatincludedComponent', () => {
  let component: WhatincludedComponent;
  let fixture: ComponentFixture<WhatincludedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatincludedComponent]
    });
    fixture = TestBed.createComponent(WhatincludedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
