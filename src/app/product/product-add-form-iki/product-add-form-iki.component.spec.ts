import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddFormIkiComponent } from './product-add-form-iki.component';

describe('ProductAddFormIkiComponent', () => {
  let component: ProductAddFormIkiComponent;
  let fixture: ComponentFixture<ProductAddFormIkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddFormIkiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddFormIkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
