import { Component, OnInit } from '@angular/core';

import { ToolsService } from '../../../../tools.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  // whatsapp
  private whatsAppUrl: string = "https://api.whatsapp.com/send?";
  private message: string = "text=";
  private phone: string = "&phone=573212054503";

  // Table
  columnsToDisplay = ['category', 'product', 'weight', 'total'];

  constructor(public toolsService: ToolsService) { }

  ngOnInit(): void {
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

  openWhatsApp() {

    let products = '';

    if(this.toolsService.productsInCart){
      this.toolsService.productsInCart.forEach(product => {
        if(product.valor > 0 && product.cantidad > 0) { 
          let valueItem = (product.valor * product.cantidad).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          valueItem = valueItem.substring(0, valueItem.length - 3);
          products = `${products} (${product.categoria}) ${product.titulo} ${product.cantidadLetrero} valor: $${valueItem}.`;
        }
      });
    }

    let sendMessage = `Hola, este es un nuevo pedido. Necesito ${products}. Muchas gracias`;

    window.open(`${this.whatsAppUrl}${this.message}${sendMessage}${this.phone}`, "_blank");
  }
}
