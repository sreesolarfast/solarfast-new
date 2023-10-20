import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsincludedComponent } from './whatsincluded.component';

describe('WhatsincludedComponent', () => {
  let component: WhatsincludedComponent;
  let fixture: ComponentFixture<WhatsincludedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatsincludedComponent]
    });
    fixture = TestBed.createComponent(WhatsincludedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
