import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { GlobalService } from '../global.service';
import { AppComponent } from '../app.component';
import { ToasterService } from 'angular5-toaster';
import { Pallier } from '../pallier';

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
  _cout: any;
  money: number;
  progressbar: any;
  lastupdate: any;

  @ViewChild('bar') progressBarItem;

  @Input()
  set prod(value: Product) {
    this.product = value;
    if (this.product && this.product.timeleft > 0) {
      this.lastupdate = Date.now();
      let progress = (this.product.vitesse - this.product.timeleft) / this.product.vitesse;
      this.progressbar.set(progress);
      this.progressbar.animate(1, { duration: this.product.timeleft });
    }
  }

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) {
      this._qtmulti = this.calcMaxCanBuy()[0];
      this._cout = this.calcMaxCanBuy()[1];
    }
  }

  @Input()
  set pmoney(value: number) {
    this.money = value;
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyAchat: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private service: GlobalService, private toasterService: ToasterService) {
    this.url = this.service.url;
  }

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, { strokeWidth: 50, color: '#28a745' });
    setInterval(() => {
      this.calcScore(); this.calcQuantite();
    }, 100);
  }

  achat(): void {
    var qt = this.calcMaxCanBuy()[0];
    this.product.quantite += qt;
    this.product.palliers.pallier.forEach(u => {
      if (u.unlocked == false) {
        if (this.product.quantite >= u.seuil) {
          u.unlocked = true;
          switch (u.typeratio) {
            case "GAIN":
              this.product.revenu = this.product.revenu * u.ratio;
              break;
            case "VITESSE":
              this.product.vitesse = Math.round(this.product.vitesse / u.ratio);
              this.product.timeleft = Math.round(this.product.timeleft / u.ratio);
              if (this.product.timeleft > 0)
                this.progressbar.animate(1, { duration: this.product.timeleft });
              break;
          }
          this.toasterService.pop('success', u.name, this.product.name + " " + u.typeratio + " x" + u.ratio);
        }
      }
    });
    this.notifyAchat.emit(this._cout);
    this.service.putProduct(this.product);
  }

  production(): void {
    if (this.product.timeleft == 0 && this.product.quantite > 0 && this.product) {
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.product.timeleft = this.product.vitesse;
      this.lastupdate = Date.now();
    }
  }

  calcScore(): void {
    if (this.product.timeleft != 0) {
      this.product.timeleft -= (Date.now() - this.lastupdate);
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

  calcQuantite(): void {
    this._qtmulti = this.calcMaxCanBuy()[0];
    this._cout = this.calcMaxCanBuy()[1];
  }

  calcMaxCanBuy(): any {
    var c = this.product.cout;
    var q = this.product.croissance;
    if (this._qtmulti == "MAX") {
      var i = 0;
      var p = 0;
      do {
        i++;
        p = c * Math.pow(q, this.product.quantite) * ((1 - Math.pow(q, i)) / (1 - q));
      } while (p < this.money);
      if (i > 1) {
        i--;
        p = c * Math.pow(q, this.product.quantite) * ((1 - Math.pow(q, i)) / (1 - q));
      }
      return [i, p];
    }
    else {
      p = c * Math.pow(q, this.product.quantite) * ((1 - Math.pow(q, this._qtmulti)) / (1 - q));
      return [this._qtmulti, p];
    }

  }

  calcUpgrade(p: Pallier) {
      if(this.product.quantite < p.seuil) {
        return true;
    }
  }
}