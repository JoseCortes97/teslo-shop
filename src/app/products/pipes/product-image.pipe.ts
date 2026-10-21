import { Pipe, type PipeTransform } from '@angular/core';
import { enviroment } from '@environments/environment';

const baseUrl = enviroment.baseUrl;
@Pipe({
  name: 'productImage',
  standalone: true,
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string): any {
    if (!value) return './assets/images/no-image.jpg';
    return `${baseUrl}/files/product/${value}`;
  }
}
