import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AletifyService } from '../services/aletify.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient } from '@angular/common/http'; Bunu alıp product.service.ts'e taşıdık. Http Client zaten öyle componente yazılmaz.

//declare let alertify:any; // Bu satırla sistemdeki js dosyalarının içerisinden alertify nesnesini buluyoruz.
//Burada aletfiy tanımlamayacağız. Çünkü burası baya karışık olur.
//Alertify gibi sürekli başka komponentler tarafından kullanıcak
//olan kütüphaneleri app'in altına s g services aletifiy (yani servis ismi) şeklinde yazarsak component
//içerisine çağırmış oluruz.

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService] //Bu bir lokal servis. ngOninit kısmında product servise bağanmadan önce buraya bunu yazıyoruz ki import kısmına otomatik gelsin ProductService.
})
export class ProductComponent implements OnInit { //oninit bir component ilk kez açıldığında çalışır, çağrılır

  constructor(
    private alertifyService: AletifyService,
    private productService: ProductService, //providers'a ekleme yaptıktan sonra buraya da productservice'i enjekte edebiliriz. 
    private activatedRoute: ActivatedRoute
    ) { } //, private http: HttpClient AletifyService'ın yanında bu soldaki HttpClient da injection olarak tanımlıydı. Normalde HttpClient componentte değil serviste olur. bu kısmı servise ekledik.
  title = "Ürün Listesi";
  filterText = "";
  products!: Product[]; //değişkenden sonra ünlem işareti eklediğimizde, TypeScript'e değerin boş veya tanımsız olmadığından emin olduğumuzu söylüyoruz.
  // path = "http://localhost:3000/products" //Bu path komutunu da buradan kesip product.service.ts dosyasına yapıştırdık.

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      //Aşağıdaki kodun aynısını categoryID yerine paramsı yazarak buranın içine yazıyoruz.
      this.productService.getProducts(params["categoryId"]).subscribe(data=>{
        this.products = data
      });

    })
    //Bu alttakileri product servis oluşturmadan önce kullanmıştık. Şİmdi bu kodlar services'in altında oluşturduğumuz product servisin içinde olacak. 
    //Ürünleri çekip listeleme işlemi başka componentlerde de kullanılabilir bir şey olduğu için bu kodu bir servis haline getirdik.
    /*     this.http.get<Product[]>(this.path).subscribe(data => {
          this.products = data
        }) */
        //this.productService.getProducts(categoryId).subscribe(data=>{
          //this.products = data
        //});//burada subscribe'ı görene kadar işlem bitmiyor. En son ne ypacaksın bunu söylemen gerekiyor.
  }

  /*http de aynı alertifyjs gibi bir servistir. Biz get metodu ile veriğimiz adrese get işlemini gerçekleştirerek
  products uzantılı adresten ürünleri çekeceğiz. Bunun için bizim aslında var olan bir sisteme subscribe olmamız gerekiyor.
  Buraya subscribe operasyonunu yazıyoruz. Subscribe ile aslında get'in içine yazdığımız adresten veri istediğimizi belirtmiş oluyoruz.
  Burası aslında bizim o datayı ne yapacağımızı da belirlediğimiz yerdir. Bunun için
  subscribe'ın içine data diye bir şey geldiğini varsayıyoruz. arrow function vasıtasıyla parantez
  açıp kapatın.Enter'a basın. Burada arrow functionın soluna yazdığımız data, Postman'de
  GET metoduyla girdiğimiz URL'i SEND ile gönderdiğimizde alt kısımdaki editörde çıkan JSON formatındaki verinin ta kendisidir.
  Şimdi bu datayı ne yapacağımızı söylüyoruz. this.products = data (nın ta kendisi) Burada şöyle bir şey söz konusu;
  product array'i dönüyor aslında bize. Bize direkt product array'i döndüğü için ekstra bir şey yapmamız gerekmiyor.
  Fakat imleci data'nın yanına koyduğumuzda kızıyor. Diyor ki bana bir obje geldi ama ben onu product'a çeviremiyorum.
  Şeklinde bizi uyarıyor. Bunun nedeni bizim şunu gerçekleştirmememiz; Gelen datanın product türünde olduğunu belirtmemiz gerekiyor.
  O da GET'in yanına generic bir operasyon olan yukarıdaki gibi <Product[]> şunu yazmamızdır. Bu yazım ile şunu diyoruz. Sana bir product array'i
  gelecek. Yani onu product array'ine map et demek kısacası. Yani postman'deki notasyonu, gelen veriyi bir product arrayine çeviriyor. Çift tırnak içindeki bütün alanlar birbiriyle 
  eşleşiyor ya onu map ediyor kısacası. Dolayısıyla kodda altı çizili vs hiç bişey kalmadı. Her şey halloldu. Şimdi kaydedilim. Bunu yaptığımız zaman backend'e kaydettiğimiz ürünlerin
  tarayıcıda ekranımıza gelmesini bekliyoruz. Şimdi gerçekten bize sağlanan bir API ile dataya ulaştık. yani arkada api hazırsa biz ona böyle ulaşabiliyoruz.
  Şu an biz test ortamında kendi JSON server'ımızı kurduk. Bu çok güzel bir kullanım geliştiriciler için. Bize ileride bir projede aynı adres içinde başka bir api sağlandığında
  aynı standartlarda, product dönen vs. aynı kodu çalıştırabiliriz. Programcının yapması gereken http://localhost:3000/products adresini değiştirmektir. Bu kodu bir seviye daha ileri taşımak istersek
  yazdığımız bu adresi global'e taşıyabiliriz. Bunun için constructor'ın altına path ekliyoruz. Adresi oraya yapıştırıyoruz. GET'in içine de
  bu oluşturduğumuz path'i ekliyoruz this.path komutu ile. İlerleyen zamanlarda biz data ekledikçe tarayıcıdaki sayfa dinamik olarak güncellenebilecek. */
  /*   ngOnInit(): void {
      this.http.get("http://localhost:3000/products").subscribe()
    } */

  addToCart(product: { name: string; }) {
    this.alertifyService.error(product.name + " added")

    //Alt satırdaki komutu da kapattık. Çünkü bunu artık burada kullanmayacağız servis ekledik. Orada kullanacağız.
    //alertify.success(product.name + " added")       //Bunu bu şekilde ekleyince alertify'ı kabul etmedi altını çizdi. alertify'ı tanıtmak için
    //Bu sayfanın en üstünde declare komutunu kullanmalıyız.
  }

  /* Önce bu aşağdaki kodu kullanıyorduk. Sonra daha güzel gözükmesi için alertifyjs kütüphanesini ekledik.
  Onu kullanmak için de aşağıdaki kodu üstteki kod haline getirdik.*/
  /*   addToCart(product: { name: string; }){
      alert("Sepete Eklendi : " + product.name)
    } */
}
