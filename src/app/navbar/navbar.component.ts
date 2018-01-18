import { Component, OnInit } from '@angular/core';
import { World } from '../world';
import { AppService } from '../app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {


    world : World;
    game: string;
    score:number;

    constructor(private appService : AppService) { }
  
    ngOnInit() {
      this.appService.getWorld().subscribe(data => {
        this.game = data.name;
        this.score = data.money;
        }, err => {
          console.log(err);
        });
        this.calcScore();
    }

  interval = 10;
  
  money = 0;
  nb = 0;
  niv ="";

  calcScore() {
      setInterval(() => {
      this.money = this.money + 1;
      this.nb = this.money;
        if (this.money == 1000) {
          this.nb = this.formatNumber(this.nb) ;
          this.niv = "K";
        } 
      }, this.interval);
  }

  formatNumber(number) {
    if(number < 1000)
        number = number.toFixed(2);
    else if(number < 1000000)
        number = number.toFixed(0);
    else if(number >= 1000000) {
        number = number.toPrecision(4);
        number = number.replace(/e\+(.*)/, "x10<sup>$1</sup>");
    }
    return number;
}
}
