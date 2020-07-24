import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../../products.service';
import { ProductFirebase } from 'src/app/interfaces/ProductFirebase.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public id: string;
  private item: number = null;
  public currentItem: ProductFirebase = null;

  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    public router: Router) {
      setTimeout(() => {
        if(this.item === null) {
          this.router.navigate(['/productos']);
        }
        else {
          this.currentItem = this.productService.getProductById(this.item);
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
        this.currentItem = this.productService.getProductById(Number(params['item']));
      }
      else {
        this.item = null;
        this.router.navigate(['/productos']);
      }
    });
  }

}
