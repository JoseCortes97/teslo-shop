import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import {
  Gender,
  Product,
  ProductsResponse,
} from '../interfaces/products/product-response.interface';
import { enviroment } from '@environments/environment';
import { User } from '@auth/interfaces/auth.interface';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}
const baseUrl = enviroment.baseUrl;

const emptyProduct: Product = {
  id: 'new',
  title: '',
  description: '',
  price: 0,
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Kid,
  tags: [],
  images: [],
  user: {} as User,
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;
    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(tap((resp: ProductsResponse) => this.productsCache.set(key, resp)));
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (idSlug === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap((resp: Product) => this.productCache.set(idSlug, resp)));
  }

  createProduct(product: Partial<Product>, imageFileList?: FileList): Observable<Product> {
    const currentImages = product.images ?? [];
    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => ({
        ...product,
        images: [...currentImages, ...imageNames],
      })),
      switchMap((productWithImages) =>
        this.http.post<Product>(`${baseUrl}/products`, productWithImages),
      ),
      tap((resp: Product) => this.updateProductCache(resp)),
    );
  }

  updateProduct(
    id: string,
    product: Partial<Product>,
    imagesFiles?: FileList,
  ): Observable<Product> {
    const currentImages = product.images ?? [];

    return this.uploadImages(imagesFiles).pipe(
      map((imageNames) => ({
        ...product,
        images: [...currentImages, ...imageNames],
      })),
      switchMap((productWithImages) =>
        this.http.patch<Product>(`${baseUrl}/products/${id}`, productWithImages),
      ),
      tap((resp: Product) => this.updateProductCache(resp)),
    );
  }

  updateProductCache(product: Product): void {
    const idProduct = product.id ?? '';

    this.productCache.set(idProduct, product);

    this.productsCache.forEach((productsResponse) => {
      productsResponse.products = productsResponse.products.map((currentProduct) =>
        currentProduct.id === idProduct ? product : currentProduct,
      );
    });
  }

  uploadImages(imagesFiles?: FileList): Observable<string[]> {
    if (!imagesFiles || imagesFiles.length === 0) {
      return of([]);
    }

    const uploadObservables = Array.from(imagesFiles).map((imageFile) =>
      this.uploadImage(imageFile),
    );
    return forkJoin(uploadObservables).pipe(
      tap((imageNames) => console.log('Uploaded images:', imageNames)),
    );
  }

  uploadImage(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', image);

    return this.http
      .post<{ fileName: string }>(`${baseUrl}/files/product`, formData)
      .pipe(map((resp) => resp.fileName));
  }
}
