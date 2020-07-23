import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from '../app/components/products/products.component';

const routes: Routes = [
  { path: 'productos',  component: ProductsComponent },
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
