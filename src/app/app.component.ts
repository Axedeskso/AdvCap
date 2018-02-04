import { Component } from '@angular/core';
import { World } from './world';
import { GlobalService } from './global.service';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  logo: string;

  user = "";

  world: World = new World();
  server: string;
  products: Product[];
  qtmulti: string;

  constructor(private service: GlobalService) {
    this.server = service.url;
    this.service.getWorld().subscribe(data => {
      this.world = data;
      this.title = data.name;
      console.log(this.world);
      this.products = data.products.product;
    });
    this.qtmulti = "1";

    setInterval(() => { this.calcScore(); }, 100);
  }

  calcScore() : void{
    this.world.money = this.world.money + 1
  }
  
  upMulti(): void {
    switch (this.qtmulti) {
      case "1":
        this.qtmulti = "10";
        break;
      case "10":
        this.qtmulti = "100";
        break;
      case "100":
        this.qtmulti = "MAX";
        break;
      case "MAX":
        this.qtmulti = "1";
        break;
    }
  };
}

