import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotouploadComponent } from './photoupload.component';

describe('PhotouploadComponent', () => {
  let component: PhotouploadComponent;
  let fixture: ComponentFixture<PhotouploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotouploadComponent]
    });
    fixture = TestBed.createComponent(PhotouploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
