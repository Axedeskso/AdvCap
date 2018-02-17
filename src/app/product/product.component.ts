import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { GlobalService } from '../global.service';
import { AppComponent } from '../app.component';

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
  _qtmulti: any;
  money: number;
  achatStatus: string;
  progressbar: any;
  lastupdate: any;

  @ViewChild('bar') progressBarItem;

  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) {
      console.log(" -- " + this.calcMaxCanBuy());
      this.calcMaxCanBuy();
      console.log("--------------------------------------------");
    }
  }

  @Input()
  set pmoney(value: number) {
    this.money = value;
    if (this.money < this.product.cout) {
      this.achatStatus = "false";
    }
    else {
      this.achatStatus = "true";
    }
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyAchat: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private service: GlobalService) {
    this.url = service.url;
  }

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, { strokeWidth: 50, color: '#00ff00' });
    setInterval(() => { this.calcScore(); }, 100);
  }

  achat(): void {
    this.notifyAchat.emit(this.product);
    this.product.quantite += 1;
    //this.product.revenu = this.product.revenu + 1;
    //this.product.cout = this.product.cout + (this.product.croissance / 100);
  }

  production(): void {
    if (this.product.timeleft == 0 && this.product.quantite > 0) {
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.product.timeleft = this.product.vitesse;
      this.lastupdate = Date.now();
    }

  }

  calcScore(): void {
    if (this.product.timeleft != 0) {
      this.product.timeleft -= Date.now() - this.lastupdate;
      this.lastupdate = Date.now();
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.progressbar.set(0);
        this.notifyProduction.emit(this.product);
      }
    }
    if (this.product.managerUnlocked == true && this.product.timeleft == 0 && this.product.quantite > 0) {
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.product.timeleft = this.product.vitesse;
      this.lastupdate = Date.now();
    }
  }

  calcMaxCanBuy(): any {
    var q = 1 + this.product.croissance / 100;
    if (this._qtmulti == "MAX") { // calcul de la quantité maximale et du prix de cette quantité
      var i = 0;
      var p = 0;
      do {
        i++;
        p = this.product.cout * Math.pow(q, this.product.quantite) * ((1 - Math.pow(q, i)) / (1 - q));
      } while (p < this.money);
      if (i > 1) {
        i--;
        p = this.product.cout * Math.pow(q, this.product.quantite) * ((1 - Math.pow(q, i)) / (1 - q));
      }
      return [i, p];
    }
    else {
      p = this.product.cout * Math.pow(q, this.product.quantite) * ((1 - Math.pow(q, this._qtmulti)) / (1 - q));
      return [this._qtmulti, p];
    }
  }
}