import { Component } from '@angular/core';
import { World } from './world';
import { GlobalService } from './global.service';
import { Product } from './product';
import { Pallier } from './pallier';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  logo: string;
  player:string;
  theme:string;
  username: any;
  world: World = new World();
  server: string;
  products: Product[];
  unlocks: Pallier[];
  allunlocks: Pallier[];
  managers: Pallier[];
  upgrades: Pallier[];
  angels: Pallier[];
  qtmulti: any;
  achatStatus:string;

  constructor(private service: GlobalService, private toasterService: ToasterService) {
    this.server = service.getServeur();
    this.player = "img/profil/user.png"
    this.theme = "msc/theme.mp3";
    this.service.getWorld().then(data => {
      this.world = data;
      this.title = this.world.name;
      this.allunlocks = this.world.allunlocks.pallier;
      this.products = this.world.products.product;
      this.products.forEach(produit => {
        produit.palliers.pallier.forEach(pallier =>{
          this.allunlocks.push(pallier);
        });
      });
      console.log(this.allunlocks);
      this.upgrades = this.world.upgrades.pallier
      this.angels = this.world.angelupgrades.pallier;
      this.angels.forEach(a => {
        this.upgrades.push(a);  
      });
      console.log(this.upgrades);
      this.managers = this.world.managers.pallier;
    });
    this.qtmulti = 1;
    this.initiateUser();
    this.username = localStorage.getItem("username");
  }

  initiateUser():void{
    if (this.username == null || this.username == "" ) {
      var num = Math.floor(Math.random() * 10000);
      var pseudo = "CaptainObvious";
      this.username = pseudo + num;
    }
  }

  buyManager(m):void{
    console.log('CIBLE : '+ this.world.products.product[m.idcible-1].name);
    this.toasterService.pop('success',"Manager Hired !", m.name);
  }

  onUsernameChanged(user:any): void {    
    localStorage.setItem("username", user);
    this.service.user = user;
    this.service.getWorld();
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

  onProductionDone(p:Product): void {
    this.world.money += (p.revenu*p.quantite) * (1 + this.world.activeangels * this.world.angelbonus / 100);
    this.world.score += (p.revenu*p.quantite) * (1 + this.world.activeangels * this.world.angelbonus / 100);
  }

  onBuy(p): void {
    this.world.money = this.world.money - p;
  }

}