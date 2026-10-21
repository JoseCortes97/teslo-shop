import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-products-admin',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin.component.html',
})
export class ProductsAdminComponent {
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  paginationService = inject(PaginationService);
  perPage = signal(10);

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1, limit: this.perPage() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({ offset: params.page * 9, limit: params.limit });
    },
  });
}
