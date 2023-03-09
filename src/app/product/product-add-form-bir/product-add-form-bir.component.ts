import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { AletifyService } from 'src/app/services/aletify.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add-form-bir',
  templateUrl: './product-add-form-bir.component.html',
  styleUrls: ['./product-add-form-bir.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddFormBirComponent implements OnInit {

  constructor(private categoryService: CategoryService, 
    private productService : ProductService, 
    private alertifyService : AletifyService) { } //alertify global servis olduğu için providers'a eklemeye gerek kalmadı.
  model : Product = new Product() 
  categories!: Category[];
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=> {
      this.categories = data
    });
  }

  add(form: NgForm){ //bu form kısmını validasyonu console.logtan takip edebilelim diye yazdık.
    //Yoksa parametre olarka vermemize gerek yoktur.
    //Şimdi de ürünleri hem formdan okuyabiliriz. Hem de modelimizden. Ama model
    //esas olduğu için formdan okumaya gerek yok.
    console.log(form.value.name);
    this.productService.addProduct(this.model).subscribe(data => {
      this.alertifyService.success(data.name + " başarı ile eklendi.")
    });

  }

}
