import { Component, OnInit } from '@angular/core';
//import { AletifyService } from '../services/aletify.service';
import { CategoryService } from '../services/category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  constructor(
    //private alertifyService: AletifyService, //Lazım değildi şimdi. Kaldırdık o yüzden.
    private categoryService: CategoryService) {}
  title = 'Kategori Listesi';
  categories!: Category[];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=> {
      this.categories = data
    });
    
  }
}
