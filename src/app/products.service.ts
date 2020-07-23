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
    this.loadProducts();
  }

  // functions
  public loadProducts() {
    return new Promise( (resolve, reject) => {
      this.http.get(this.urlProducts)
        .subscribe((resp: ProductFirebase[]) => {
          this.products = resp;
          this.loading = false;
          resolve();
        });
    });    
  }
}
