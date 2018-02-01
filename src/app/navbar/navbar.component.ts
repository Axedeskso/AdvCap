import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../global.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url:string;
  game: string;
  logo:string;
  money: number;
  multi: string;

  @Input()
  set qtmulti(value:string){
    this.multi=value;
  }

  constructor(private service: GlobalService) {
    this.url = service.url;
    this.service.getWorld().subscribe(data => {
      this.game = data.name;
      this.logo = this.url+""+data.logo;
      this.money = data.money;
    });    
  }

  ngOnInit() {
    
  }

  

}
