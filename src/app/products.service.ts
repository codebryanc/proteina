import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductFirebase } from './interfaces/ProductFirebase.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Firebase
  private urlProducts: string = "https://proteina-4a349.firebaseio.com/productos.json";

  // Productos
  public products: ProductFirebase[] = [];
  public loading: boolean = true;

  constructor(private http: HttpClient) {
    this.loadProducts().then(()=> {
      this.loading = false;
    });
  }

  // functions
  private loadProducts() {
    return new Promise( (resolve, reject) => {
      this.http.get(this.urlProducts)
        .subscribe((resp: ProductFirebase[]) => {
          this.products = resp;
          resolve();
        });
    });    
  }

  // Methods
  public getProductsByCategory(category: string) {
    let productsResult: ProductFirebase[] = [];
    this.products.forEach(product => {
      if(product.categoria === category) {
        productsResult.push(product)
      }
    });
    return productsResult;
  }
  
}
