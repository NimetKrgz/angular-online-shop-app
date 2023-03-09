import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { AletifyService } from 'src/app/services/aletify.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add-form-iki',
  templateUrl: './product-add-form-iki.component.html',
  styleUrls: ['./product-add-form-iki.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddFormIkiComponent implements OnInit {
  productAddForm!: FormGroup;
  product: Product = new Product();
  categories!: Category[];

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private alertifyService: AletifyService) { }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      imageUrl: ["", [Validators.required]],
      price: ["", [Validators.required]],
      categoryId: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.createProductAddForm();
    this.categoryService.getCategories().subscribe(data=> {
      this.categories = data
    });
  }

  add(){
    if(this.productAddForm.valid) {
      this.product = Object.assign({}, this.productAddForm?.value)
    }

    this.productService.addProduct(this.product).subscribe(data => {
      this.alertifyService.success(data.name + " başarı ile eklendi.")
    });
  }
}

