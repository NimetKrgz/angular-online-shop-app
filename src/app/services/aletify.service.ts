import { Injectable } from '@angular/core';
declare let alertify:any; // Bu satırla sistemdeki js dosyalarının içerisinden alertify nesnesini buluyoruz.

@Injectable(/* {
  providedIn: 'root'  // buradaki root ifadesi bunun global bir servis olacağını ifade ediyor.
} */)  //Bunu buradan kaldırdık. Çünkü daha güzel yolu var. Direkt app.module.ts' servisi tanıtmak providers kısmına AlertifySErvice yazarak.
export class AletifyService {

  constructor() { }

  success(message:string){ //tip güvenli olsun diye string yazdık. Sadece mesaage yazıp da bırakabilirdik.
    alertify.success(message)
  }

  error(message:string){ //tip güvenli olsun diye string yazdık. Sadece mesaage yazıp da bırakabilirdik.
    alertify.error(message) // bu satırdaki error alertify'ın verdiği isim. Bir üst satırda verdiğimiz de bizim verdiğimiz isim. Aynı ismi veriyoruz ki o kütüphaneden uzaklaştırmayalım diye kullanımı.
  }

  warning(message:string){ //tip güvenli olsun diye string yazdık. Sadece mesaage yazıp da bırakabilirdik.
    alertify.warning(message)
  }
}
