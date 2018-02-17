import { Component } from '@angular/core';
import { World } from './world';
import { GlobalService } from './global.service';
import { Product } from './product';
import { Pallier } from './pallier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  logo: string;
  username = "";
  world: World = new World();
  server: string;
  products: Product[];
  unlocks : Pallier[];
  managers:Pallier[];
  upgrades:Pallier[];
  qtmulti: any;

  constructor(private service: GlobalService) {
    this.server = service.url;
    this.service.getWorld().subscribe(data => {
      this.world = data;
//      this.world.allunlocks.pallier.forEach(pallier => {
  //      var p;
    //    p.push(pallier);
      //  console.log("P");
        //console.log(p);
      //});
      this.title = this.world.name;
      this.products = this.world.products.product;
      //this.world.products.product.forEach(product => {
        //product.palliers.pallier.forEach(pallier => {
        //});
      //});
      this.upgrades = this.world.upgrades.pallier;
      this.managers = this.world.managers.pallier;
    });
    this.qtmulti = 1;
    this.username = localStorage.getItem("username");
  }

  upMulti(): void {
    switch (this.qtmulti) {
      case 1:
        this.qtmulti = 10;
        break;
      case 10:
        this.qtmulti = 100;
        break;
      case 100:
        this.qtmulti = "MAX";
        break;
      case "MAX":
        this.qtmulti = 1;
        break;
    }
  }

  onProductionDone(p): void {
      this.world.money += p.revenu * (1 + this.world.activeangels * this.world.angelbonus / 100);
      this.world.score += p.revenu * (1 + this.world.activeangels * this.world.angelbonus / 100);
  }

  onBuy(p): void {
    this.world.money = this.world.money - p;
  }
}