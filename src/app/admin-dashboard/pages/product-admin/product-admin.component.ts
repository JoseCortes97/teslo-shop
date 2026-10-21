import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-product-admin',
  imports: [ProductDetailComponent],
  templateUrl: './product-admin.component.html',
})
export class ProductAdminComponent {
  activateRoute = inject(ActivatedRoute);
  route = inject(Router);
  idProduct = toSignal(this.activateRoute.params.pipe(map((params) => params['id'])));
  productService = inject(ProductsService);

  productResource = rxResource({
    params: () => ({ id: this.idProduct() }),
    stream: ({ params }) => {
      return this.productService.getProductByIdSlug(params.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.route.navigate(['/admin/products']);
    }
  });
}
