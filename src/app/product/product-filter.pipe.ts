import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], filterText: string): Product[] {
    filterText = filterText?filterText.toLocaleLowerCase(): "" //bu satır şu şekilde eğer filterText varsa (filterText?) filterText'i küçük harflere çevir.
    //eğer filterText yoksa o zaman zaten null. JS büyük küçük harf duyarlıdır. Kullanıcının girdiği bilgiyi küçük harfe çevirdik bu yüzden.
    
    return filterText?value.filter((p:Product)=> p.name
    .toLocaleLowerCase().indexOf(filterText)!==-1):value;

    //Üstteki iki satırın açıklaması: filterText varsa o zaman değeri, yani listeyi filtrele. Neye göre filtrele?
    //p.name yani her bir ürün için filtrele. Ürünün ismini küçük harfe çevir. İçinde filterText olan varsa onları 
    //listeye ekle yani kısacası yeni bir liste oluştur. Eğer filterText yoksa doğrudan değere eşitle.
  }

}
