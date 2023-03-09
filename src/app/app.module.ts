import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { AletifyService } from './services/aletify.service';
import { ProductAddFormBirComponent } from './product/product-add-form-bir/product-add-form-bir.component';
import { ProductAddFormIkiComponent } from './product/product-add-form-iki/product-add-form-iki.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './services/account.service';
import { LoginGuard } from './login/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CategoryComponent,
    ProductComponent,
    ProductFilterPipe,
    ProductAddFormBirComponent,
    ProductAddFormIkiComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AletifyService, AccountService, LoginGuard], // app.modele.ts altında provider kısmına yazdığımız servisin adını eklersek AlertifyService diye. Bu global bir servis demek oluyor.Eğer oluşturulan alertify.service.ts dosyasında root eklenmezse mantığı buradan geliyor. Yeni versiyon Angularda root bunu ifade ediyor. Ama eskiden yoktu. belki daha sonra tekrar kaldırırlar.
  bootstrap: [AppComponent]
})
export class AppModule { }
