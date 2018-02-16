import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Product } from '../product';
import { GlobalService } from '../global.service';
import { AppComponent } from '../app.component';
import { Output } from '@angular/core/src/metadata/directives';

declare var require;
const ProgressBar = require("progressbar.js");

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
  progressbar: any;

  @ViewChild('bar') progressBarItem;

  @Input()
  set prod(value: Product) {
    this.product = value;
    console.error(this.product);
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
    //if(this.money<this.product.cout){
      //this.achatStatus = "false";
    //}
    //else{
      //this.achatStatus = "true";
    //}
  }

  //@Output() 
  //notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  

  constructor(private service: GlobalService) {
    this.url = service.url;
  }

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, {strokeWidth:50, color:'#00ff00'});
    this.progressbar.animate(1, {duration:this.product.vitesse});
    //this.progressbar.set(progress);
  }

  calcMaxCanBuy(): void {

  }

  
}

