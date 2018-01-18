import { Component, OnInit } from '@angular/core';
import { World } from '../world';
import { AppService } from '../app.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlS = "http://localhost:8080/AdvCapS/";
  world : World;
  products : Product[];

  constructor(private appService : AppService) { }

  ngOnInit() {
    this.appService.getWorld().subscribe(data => {
      this.products = data.products.product;
      console.log(this.products);
      }, err => {
        console.log(err);
      });
  }

}
