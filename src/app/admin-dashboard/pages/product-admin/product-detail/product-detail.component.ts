import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carouselomponent } from '@products/components/carousel/carousel.component';
import { Product } from '@products/interfaces/products/product-response.interface';
import { ProductsService } from '@products/services/products.service';
import { FormUtils } from '../../../../utils/form-utils';
import { firstValueFrom } from 'rxjs';
import { FormErrorLabelComponent } from '../../../../shared/components/form-error-label/form-error-label.component';

@Component({
  selector: 'product-detail',
  imports: [Carouselomponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product = input.required<Product>();
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  router = inject(Router);
  fb = inject(FormBuilder);
  wasSaved = signal(false);
  productService = inject(ProductsService);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [[] as string[]],
    images: [[] as string[]],
    tags: [''],
    gender: ['', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  });

  ngOnInit(): void {
    this.setFormValues(this.product());
  }

  setFormValues(formLike: Partial<Product>) {
    this.productForm.reset({
      ...formLike,
      tags: formLike.tags?.join(',') ?? '',
    });
  }

  async onSubmit() {
    const isValid = this.productForm.valid;

    this.productForm.markAllAsTouched();
    if (!isValid) return;
    const formValues = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValues as any),
      tags:
        formValues.tags
          ?.toLocaleLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? [],
    };
    console.log(this.product());
    if (this.product().id === 'new') {
      const productNew = await firstValueFrom(this.productService.createProduct(productLike));
      this.router.navigate(['/admin/products', productNew.id]);
    } else {
      await firstValueFrom(this.productService.updateProduct(this.product().id, productLike));
    }

    this.wasSaved.set(true);

    setTimeout(() => {
      this.wasSaved.set(false);
    }, 2000);
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }
}
