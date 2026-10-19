import { Routes } from '@angular/router';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { ProductsAdminComponent } from './pages/products-admin/products-admin.component';
import { ProductAdminComponent } from './pages/product-admin/product-admin.component';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayoutComponent,
    children: [
      {
        path: 'products',
        component: ProductsAdminComponent,
      },
      {
        path: 'product/:id',
        component: ProductAdminComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];
export default adminDashboardRoutes;
