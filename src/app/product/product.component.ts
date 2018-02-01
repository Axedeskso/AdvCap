import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { GlobalService } from '../global.service';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  url:string;
  product: Product;
  multi:string;
  money:number;

  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  @Input()
  set qtmulti(value:string){
    this.multi=value;
  }

  @Input()
  set pmoney(value:number){
    this.money=value;
  }

  constructor(private service: GlobalService){
    this.url = service.url;
   }

  ngOnInit() {
  }
}