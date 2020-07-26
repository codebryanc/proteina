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

  // Search
  public productsFiltered: ProductFirebase[] = [];

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

  public filterProducst(filterValue: string) {
    this.productsFiltered = [];

    // For unify the search
    filterValue = filterValue.toLowerCase();

    this.products.forEach(aProduct => {
      if(aProduct.categoria.toLowerCase().indexOf(filterValue) >= 0 ||
      aProduct.titulo.toLowerCase().indexOf(filterValue) >= 0 ) {
        
        this.productsFiltered.push(aProduct);
      }
    });
  }
  
  public getProductById(id: number) {
    let result = null;
    if(id != undefined && id != null && id > 0) { 
      if(this.loading) {
        this.loadProducts().then(()=> {
          result = this.filetProductById(id);
        });
      }
      else {
        result = this.filetProductById(id);
      }
    }
    
    return result;
  }

  private filetProductById(id: number) {
    let result = null;

    this.products.forEach(product => {
      if(product.id === id) {
        // Inicializo la cantidad para siempre tomarla del store
        product.cantidad = 0;
        result = product;
      }
    });

    return result;
  }
}
