import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
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

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/products`, product).pipe(
      tap((resp: Product) => {
        this.updateProductCache(resp);
      }),
    );
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, product).pipe(
      tap((resp: Product) => {
        this.updateProductCache(resp);
      }),
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
}
