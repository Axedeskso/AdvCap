import { Component, OnInit } from '@angular/core';
import { World } from '../world';
import { AppService } from '../app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {


  world: World;
  game: string;
  score: number;
  multi: string;

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.appService.getWorld().subscribe(data => {
      this.game = data.name;
      this.score = data.money;
    });
    this.multi = "1";
  }

  upMulti():void {
    switch (this.multi) {
      case "1":
        this.multi = "10";
        break;
      case "10":
        this.multi = "100";
        break;
      case "100":
        this.multi = "MAX";
        break;
      case "MAX":
        this.multi = "1";
        break;
    }
  };


  formatNumber(number) {
    if (number < 1000)
      number = number.toFixed(2);
    else if (number < 1000000)
      number = number.toFixed(0);
    else if (number >= 1000000) {
      number = number.toPrecision(4);
      number = number.replace(/e\+(.*)/, "x10<sup>$1</sup>");
    }
    return number;
  }
}
