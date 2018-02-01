import { Product } from "./product";
import { Pallier } from "./pallier";

export class World {
    name : string; 
    logo : string;
    money: number; 
    score: number; 
    totalangels: number;
    activeangels: number;
    angelbonus: number;
    lastupdate: string; 
    products : { "product": Product[] };
    allunlocks: { "pallier": Pallier[]};
    upgrades: { "pallier": Pallier[]};
    angelupgrades: { "pallier": Pallier[]};
    managers: { "pallier": Pallier[]};

    constructor() {
        this.products = { "product":[ ] } ;
        this.managers = { "pallier":[ ] };
        this.upgrades = { "pallier":[ ] };
        this.angelupgrades = { "pallier":[ ] };
        this.allunlocks = { "pallier":[ ] };
    }
}