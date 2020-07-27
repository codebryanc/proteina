import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from '../app/components/products/products.component';
import { BasketComponent } from '../app/components/basket/basket.component';
import { SearchComponent } from '../app/components/search/search.component';
import { ProductDetailComponent } from '../app/components/product-detail/product-detail.component';
import { PurchaseComponent } from '../app/components/purchase/purchase.component';

const routes: Routes = [
  { path: 'productos',  component: ProductsComponent },
  { path: 'carrito',  component: BasketComponent },
  { path: 'detalle/:item',  component: ProductDetailComponent },
  { path: 'busqueda/:term',  component: SearchComponent },
  { path: 'compra', component: PurchaseComponent},
  { path: '**', pathMatch:'full', redirectTo: '/productos' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true } )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
