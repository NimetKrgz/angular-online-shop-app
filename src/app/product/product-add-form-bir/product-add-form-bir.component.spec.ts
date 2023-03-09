import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddFormBirComponent } from './product-add-form-bir.component';

describe('ProductAddFormBirComponent', () => {
  let component: ProductAddFormBirComponent;
  let fixture: ComponentFixture<ProductAddFormBirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddFormBirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddFormBirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
