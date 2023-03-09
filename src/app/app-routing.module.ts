import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { ProductAddFormBirComponent } from './product/product-add-form-bir/product-add-form-bir.component';
import { ProductAddFormIkiComponent } from './product/product-add-form-iki/product-add-form-iki.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path: 'products', component: ProductComponent},
  {path: 'product-add-bir', component: ProductAddFormBirComponent, canActivate: [LoginGuard]},
  {path: 'product-add-iki', component: ProductAddFormIkiComponent},
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products/category/:categoryId', component: ProductComponent},
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
