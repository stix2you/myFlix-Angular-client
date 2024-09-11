import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStoreComponent } from './image-store.component';

describe('ImageStoreComponent', () => {
  let component: ImageStoreComponent;
  let fixture: ComponentFixture<ImageStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
