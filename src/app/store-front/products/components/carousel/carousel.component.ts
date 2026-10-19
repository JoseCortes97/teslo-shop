import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './carousel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `
    :host {
      display: block;
      width: 100%;
      max-width: 400px; /* ajusta al tamaño que quieras */
      min-width: 0; /* evita que Swiper se estire dentro de flex/grid */
    }

    swiper-container {
      width: 100%;
      aspect-ratio: 1 / 1; /* cuadrado; usa 4 / 3 o 3 / 4 si prefieres */
      --swiper-navigation-color: #4f46e5;
      --swiper-pagination-color: #4f46e5;
    }

    swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }

    swiper-slide img {
      width: 100%;
      height: 100%;
      object-fit: contain; /* muestra la prenda completa sin recortarla */
    }
  `,
})
export class Carouselomponent {
  spaceBetween = 10;
  images = input.required<string[]>();
  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper, progress] = event.detail;
    console.log(progress);
  }

  onSlideChange() {
    console.log('slide changed');
  }
}
