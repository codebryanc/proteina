import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductFirebase } from 'src/app/interfaces/ProductFirebase.interface';

import { ProductsService } from '../../../../products.service';
import { ToolsService } from '../../../../tools.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public id: string;
  private item: number = null;
  public currentItem: ProductFirebase = null;

  // desing
  public btnAddToCartVisible: boolean = true;
  private countItem: number = 0;
  public countItemValue: string;

  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private toolsService: ToolsService) {
      setTimeout(() => {
        if(this.item === null) {
          this.router.navigate(['/productos']);
        }
        else if(this.currentItem == null) {
          this.searchItemInService(this.item);
        }
      }, 2000);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=> {
      // Param
      if(params['item'].length > 0) {
        // Item
        this.item = Number(params['item']);
        // Search item
        this.searchItemInService(Number(params['item']));
      }
      else {
        this.item = null;
        this.router.navigate(['/productos']);
      }
    });
  }

  // Desing
  addToCart() {
    this.btnAddToCartVisible = false;
    this.agregar();
  }

  // Functions
  setLabel() {
    if(this.countItem > 0) {

      if(this.countItem === 1) {
        this.countItemValue = this.countItem + ' Kilo';
      }
      else if(this.countItem > 1) {
        this.countItemValue = this.countItem + ' Kilos';
      }

    }
    else {
      this.countItemValue = '';
    }

    this.currentItem.cantidadLetrero = this.countItemValue;
  }

  updateCountInItem() {
    this.currentItem.cantidad = this.countItem;
  }

  // Methods
  remover() {
    
    // remove
    this.countItem = this.countItem - 1;
    
    // update label
    this.setLabel();

    // update Count
    this.updateCountInItem();

    if(this.countItem === 0) {
      // remove in cart
      this.toolsService.removeProductInCart(this.currentItem, 0);
      // hide buttons add and remove Cart
      this.btnAddToCartVisible = true;
    }
    else {
      // save in cart
      this.toolsService.addOrUpdateProductInCart(this.currentItem, 0);
    }
  }

  agregar() {

    // add
    this.countItem = this.countItem + 1;

    // update label
    this.setLabel();

    // update Count
    this.updateCountInItem();

    // save in cart
    this.toolsService.addOrUpdateProductInCart(this.currentItem, 1);
  }

  private searchItemInService(item: number) {
    // Search item
    this.currentItem = this.productService.getProductById(item);
    
    if(this.currentItem) {
      // Search item in store
      var itemInStore = <ProductFirebase> this.toolsService.getProductFromCart(this.currentItem);
      
      if(itemInStore) {
        // update item from store
        this.countItem = itemInStore.cantidad;
      }
      
      this.updateCountInItem();
      
      this.setLabel();
      
      // Button start cart
      if(this.countItem === 0) {
        this.btnAddToCartVisible = true;
      }
      else {
        this.btnAddToCartVisible = false;
      }
    }
  }
}