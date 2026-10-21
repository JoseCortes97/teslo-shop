import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@products/interfaces/products/product-response.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-table',
  imports: [ProductImagePipe, CurrencyPipe, RouterLink, RouterLink],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {
  products = input.required<Product[]>();
}
