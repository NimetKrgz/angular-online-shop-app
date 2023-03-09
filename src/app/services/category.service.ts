import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from  "../category/category";
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

//Product service'in kodunu aynen yapıştırdık. importa category ts i çağırdık. Dönen array ismini Category yaptık. 
//Categorileri çağıran fonksiyon ismini getCategories yaptık. db'den gelen path'i categories demiştik onu çağırdık.

@Injectable( )
export class CategoryService {

  constructor(private http: HttpClient) { }
  path = "http://localhost:3000/categories"
  getCategories():Observable<Category[]> { 
    return this.http.get<Category[]>(this.path).pipe(
      tap(data=> { console.log(JSON.stringify(data))
      }),
      //return this.data;
      catchError(this.handleError)
    ); 
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent) {      
      errorMessage = 'Bir  hata oluştu' +err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata';
    }
    return throwError (errorMessage);
    
  }

}
