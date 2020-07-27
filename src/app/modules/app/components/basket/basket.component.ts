import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../tools.service';
import { ProductFirebase } from '../../../../interfaces/ProductFirebase.interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(public toolsService: ToolsService) { }

  ngOnInit(): void {
  }

  // Functions  

  // Methods
  remover(currentItem: ProductFirebase) {
    
    // remove
    currentItem.cantidad = currentItem.cantidad - 1;
    
    // update label
    this.setLabel(currentItem);

    if(currentItem.cantidad === 0) {
      // remove in cart
      this.toolsService.removeProductInCart(currentItem, 0);
    }
    else {
      // save in cart
      this.toolsService.addOrUpdateProductInCart(currentItem, 0);
    }
  }

  agregar(currentItem: ProductFirebase) {

    // add
    currentItem.cantidad = currentItem.cantidad + 1;

    // update label
    this.setLabel(currentItem);

    // save in cart
    this.toolsService.addOrUpdateProductInCart(currentItem, 1);
  }

  // Functions
  setLabel(currentItem: ProductFirebase) {
    if(currentItem.cantidad > 0) {

      if(currentItem.cantidad === 1) {
        currentItem.cantidadLetrero = currentItem.cantidad + ' Kilo';
      }
      else if(currentItem.cantidad > 1) {
        currentItem.cantidadLetrero = currentItem.cantidad + ' Kilos';
      }

    }
    else {
      currentItem.cantidadLetrero = '';
    }
  }

  getTotalPurchase() : number {
    let total = 0;
    
    if(this.toolsService.productsInCart){
      this.toolsService.productsInCart.forEach(product => {
        total = (product.cantidad * product.valor) + total;
      });
    }

    return total;
  }
}
