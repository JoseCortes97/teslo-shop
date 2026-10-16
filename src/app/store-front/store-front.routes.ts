import { Routes } from '@angular/router';
import { StoreFrontComponent } from './layouts/store-front/store-front.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GenderPageComponent } from './pages/gender-page/gender-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const storeFrontRoute: Routes = [
  {
    path: '',
    component: StoreFrontComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'gender/:gender',
        component: GenderPageComponent,
      },
      { path: 'product/:idSlug', component: ProductPageComponent },
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: '**',
        component: NotFoundPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default storeFrontRoute;
