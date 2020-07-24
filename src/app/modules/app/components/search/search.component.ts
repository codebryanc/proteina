import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=> {
      this.productsService.filterProducst(params['term']);
    });
  }

}
