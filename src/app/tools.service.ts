import { Injectable } from '@angular/core';

import { ProductFirebase } from './interfaces/ProductFirebase.interface';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  // Key
  private allProducts = "proteina_data_cart";

  // Productos
  public productsInCart: ProductFirebase[] = [];

  constructor() {
    this.getProductsFromStore();
  }

  // functions
  private storeInStorage() {
    if(localStorage) {
      if(this.productsInCart && this.productsInCart.length > 0){
        localStorage.setItem(this.allProducts, JSON.stringify(this.productsInCart));
      }
      else {
        localStorage.removeItem(this.allProducts);
      }
    }
  }
  
  private getProductsFromStore() {
    // Get data
    var currentDataInStore = localStorage.getItem(this.allProducts);
    
    if(currentDataInStore != null && currentDataInStore != undefined) {
      this.productsInCart = JSON.parse(currentDataInStore);
    }
  }

  // Methods
  public addProductInCart(product: ProductFirebase) {
    if(product != null) {

      var productsInCartResult: ProductFirebase[] = [];
      let itemFounded = false;

      // For Update
      this.productsInCart.forEach(aProduct => {
        if(aProduct.id === product.id) {
          // set all important data
          aProduct.cantidad = product.cantidad;

          itemFounded = true;
        }

        productsInCartResult.push(aProduct);
      });

      if(itemFounded === false) {
        productsInCartResult.push(product);
      }

      this.productsInCart = productsInCartResult;

      this.storeInStorage();
    }
  }

  public emptyCart() {
    this.productsInCart = [];
    this.storeInStorage();
  }

  public removeProductInCart(product: ProductFirebase) {
    var productsInCartResult: ProductFirebase[] = [];
    
    this.productsInCart.forEach(aProduct => {
      if(aProduct.id != product.id) {
        productsInCartResult.push(aProduct);
      }
    });

    this.productsInCart = productsInCartResult;

    this.storeInStorage();
  }

  public getProductFromCart(product: ProductFirebase) {
    
    this.getProductsFromStore();

    var productResult = null;
    
    if(product != null) {
      this.productsInCart.forEach(aProduct => {
        if(aProduct.id === product.id) {
          productResult = aProduct;
        }
      });
    }

    return productResult;
  }
}
