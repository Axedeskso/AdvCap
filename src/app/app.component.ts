import { Component, ViewChildren, QueryList } from '@angular/core';
import { World } from './world';
import { GlobalService } from './global.service';
import { Product } from './product';
import { Pallier } from './pallier';
import { ToasterService } from 'angular5-toaster';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  logo: string;
  theme: string;
  username: string;
  world: World = new World();
  server: string;
  products: Product[];
  unlocks: Pallier[];
  allunlocks: Pallier[];
  managers: Pallier[];
  upgrades: Pallier[];
  angels: Pallier[];
  qtmulti: any;
  notifM = "";
  notifUp = "";

  @ViewChildren(ProductComponent) productsComponent: QueryList<ProductComponent>;

  constructor(private service: GlobalService, private toasterService: ToasterService) {
    this.server = service.getServeur();
    this.username = localStorage.getItem("username");
    this.service.setUser(this.username);

    //if (this.username == "" || this.username == null) {
    //this.initiateUser();
    //}
    //this.theme = "msc/theme.mp3"; 
    this.service.getWorld().then(data => {
      this.world = data;
      this.title = this.world.name;
    });
    this.qtmulti = 1;
    this.notify();
  }

  initiateUser(): void {
    var num = Math.floor(Math.random() * 10000);
    var pseudo = "CaptainObvious";
    this.username = pseudo + num;
    localStorage.setItem("username", this.username);
    this.service.setUser(this.username);
  }

  onUsernameChanged(): void {
    //if (this.username == "" || this.username == "null") {
    //this.initiateUser();
    //} else {
    localStorage.setItem("username", this.username);
    this.service.setUser(this.username);
    this.service.getWorld();
    //}
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

  onProductionDone(p: Product): void {
    this.world.money += (p.revenu * p.quantite) * (1 + this.world.activeangels * this.world.angelbonus / 100);
    this.world.score += (p.revenu * p.quantite) * (1 + this.world.activeangels * this.world.angelbonus / 100);
    this.notify();
    this.service.putProduct(p);
  }

  onBuy(p): void {
    this.world.money -= p;
    this.notify();
    this.checkAllunlock();
  }

  buyManager(m): void {
    this.world.money -= m.seuil;
    m.unlocked = true;
    this.world.products.product[m.idcible - 1].managerUnlocked = true;
    this.toasterService.pop('success', "Manager Hired !", m.name + " s'occupe des " + this.world.products.product[m.idcible - 1].name);
    this.service.putManager(m);
    this.notify();
  }

  notify(): void {
    this.notifM = "";
    this.notifUp = "";
    for (let m of this.world.managers.pallier) {
      if (this.world.money >= m.seuil && !m.unlocked) {
        this.notifM = "NEW";
      }
    }
    for (let up of this.world.upgrades.pallier) {
      if (this.world.money >= up.seuil && !up.unlocked) {
        this.notifUp = "NEW";
      }
    }
  }

  buyUpgrade(u): void {
    this.world.money -= u.seuil;
    u.unlocked = true;
    this.world.products.product[u.idcible - 1].managerUnlocked = true;
    this.toasterService.pop('success', "Upgrade Hired !", u.name + " /-\ " + this.world.products.product[u.idcible - 1].name);
    this.service.putUpgrade(u);
    this.notify();
  }

  resetWorld(): void {
    this.service.deleteWorld();
    window.location.reload();
  }

  checkAllunlock() {
    this.world.allunlocks.pallier.forEach(u => {
      if (u.unlocked == false) {
        var all = false;
        this.productsComponent.forEach(p => {
          if (p.calcUpgrade(u)) {
            all = true;
          }
        });
        if (!all) {
          u.unlocked = true;
          switch (u.typeratio) {
            case "GAIN":
              this.world.products.product.forEach(p => {
                p.revenu *= u.ratio;
              });
              break;
            case "VITESSE":
              this.world.products.product.forEach(p => {
                p.vitesse = Math.floor(p.vitesse / u.ratio);
                p.timeleft = Math.floor(p.timeleft / u.ratio);
              });
          }
          this.toasterService.pop('success', "ALL " + u.typeratio + " x" + u.ratio);
        }
      }
    });
  }
}