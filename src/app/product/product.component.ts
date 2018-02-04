import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { GlobalService } from '../global.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  url: string;
  product: Product;
  multi: string;
  money: number;
  achatStatus:string;

  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  @Input()
  set qtmulti(value: string) {
    this.multi = value;
    if (this.multi && this.product) {
      this.calcMaxCanBuy();
    }

  }

  @Input()
  set pmoney(value: number) {
    this.money = value;
    if(this.money<this.product.cout){
      this.achatStatus = "false";
    }
    else{
      this.achatStatus = "true";
    }
  }

  constructor(private service: GlobalService) {
    this.url = service.url;
  }

  ngOnInit() {
  }

  calcMaxCanBuy(): void {

  }
}

