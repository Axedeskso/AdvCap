import { Component, OnInit } from '@angular/core';
import { World } from '../world';
import { AppService } from '../app.service';
import { Product } from '../product';
import { forEach } from '@angular/router/src/utils/collection';
import { Pallier } from '../pallier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ip: String;
  urlS = "http://localhost:8080/AdvCapS/";
  world: World;
  products: Product[];
  palliers: Pallier[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getWorld().subscribe(data => {
      this.world = data;
      this.products = data.products.product;
    });
  }
}



