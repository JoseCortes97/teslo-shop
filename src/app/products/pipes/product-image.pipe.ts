import { Pipe, type PipeTransform } from '@angular/core';
import { enviroment } from '@environments/environment';

const baseUrl = enviroment.baseUrl;
@Pipe({
  name: 'productImage',
  standalone: true,
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string): any {
    return `${baseUrl}/files/product/${value}`;
    // if (value.length === 0 || !value[0]) return './assets/images/no-image.jpg';

    // if (value.length > 1) return `${baseUrl}/files/product/${value[0]}`;

    // return `${baseUrl}/files/product/${value}`;
  }
}
