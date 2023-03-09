import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable(
  /*   {
    //providedIn: 'root' defaultta bu soldaki kod geliyor. Global servis gibi. Bunu yorum yapıp kendi kodumuzu ekliyoruz.
  } */
)
export class ProductService {

  constructor(private http: HttpClient) { }
  path = "http://localhost:3000/products"
  //Şimdi aşağıya ürünleri listeleyecek bir operasyon tanımlıyoruz. 
  // import kısmına HttpClient'ı eklediğimiz ve sonrasında da constructor'ın içine http'yi tanımladığımız için aşağıda getProducts fonksiyonun
  //içinde this.http algılandı ve altını çizmedi. Product'ı import etmediğimiz için ve path'i de eklemediğimiz için onların altı çiziliydi.
  // Product'ı eklemek için üstüne geldik çıkan mavi ampulden import edilmesini sağladık.Bu sayfanın en üstüne Product import ile eklenmiş oldu.
  //product.component.ts dosyasından gittik path = "http://localhost:3000/products" bu satırı aldık yukarı yapıştırdık. Artık path'in de altı çizili
  //gelme durumu ortadan kalktı. Buraya taşıdığımız için tekrar tekrar kullanılabilir hale getirmiş olduk.
  getProducts(categoryId: any):Observable<Product[]> { //burada diyoruz ki ben bir Product arrayini observable olarak döndüreceğim. Bu şu anlama geliyor. Diğer taraf (muhtemelen component tarafı) buna subscribe dönebilir.
    
    let newPath = this.path;
    if(categoryId){
      newPath += "?categoryId="+categoryId //Bunu bu şekilde yazmakla alt satırdaki gibi yazmak arasında fark yokmuş
      //newPath = newPath + "?categoryId="+categoryId
    }

    alert(categoryId)
    return this.http.get<Product[]>(newPath).pipe(
      tap(data=> { console.log(JSON.stringify(data))
      }),
      //return this.data;
      catchError(this.handleError)
    ); //Şu soldan sildiğimiz subscribe ile ilgili mevzu tamamen Observable Patterninin angulardaki implementasyonunda yani ben bu operasyonu sonlandırıyorum demek. 
    /*Bizim bir önceki dersteki kullanıcımız üstte yazan product datasını olduğu gibi direkt kullandı.
    Ama öyle bir durum olur ki siz bu datanın içinden belirli bir kısmı almak isteyebilirsiniz veya burada
    bir hata yönetimi yapmak isteyebilirsiniz veya başka bir mapping yapmak isteyebilirsiniz. Kısacası
    subscribe kısmını Angular'da bu şekilde yazmıyoruz. Subscribe'ı tamamen componentte bırakıyoruz. 
    Subscribe kısmını sildikten sonra başına da return ekledik.*/
    /*Bu yukarıdaki get operasyonu bize ne dönüyor? 
    Bize bir Observable dönüyor. Bu Observable ne işe yarıyor?
    Yukarıya eklediğimiz aslında Observable design pattern'inin bir implementasyonudur.
    angularda hazır bir şekilde implemente edilmiş versiyonudur.*/ 
    /* getProducts return dedik ya bu şekilde aslında iş bitmiyor. Yukarıdaki iki satır kod çalışırken subscribe ile birleşiyor. Yani önce burdaki kod çalışıp sonra subscribe çalışıyor diye bir şey yok.
    Çünkü observable dediğimiz için subscribe'ı görene kadar işlem hayatına devam ediyor. Bu açıdan biz artık product.component.ts dosyasına gidip ngOninit içerisine Product Servisini çağırabiliriz.*/
  }

  addProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Token'
      })
    }
    return this.http.post<Product>(this.path, product, httpOptions ).pipe(
      tap(data=> { console.log(JSON.stringify(data))
      }),
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
