import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/products/product-response.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
})
export class CardComponent {
  product = input.required<Product>();
}
