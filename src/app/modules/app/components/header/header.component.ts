import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private productsService: ProductsService,
    public router: Router) { }

  ngOnInit(): void {
  }

  public searchProduct(term: string) {
    if(term.length > 0) {
      this.router.navigate(['/busqueda', term]);
    }
  }

}
