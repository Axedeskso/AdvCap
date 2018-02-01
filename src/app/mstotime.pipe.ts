import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mstotime'
})
export class MstotimePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let res : string;
    let seconds : number;
    let minutes : number;
    let heures : number
    seconds = (value/1000);
    minutes = (seconds/60);
    heures = (minutes/60)
    seconds = seconds % 60;
    minutes = minutes % 60;

    res = n(Math.floor(heures)) + ':' + n(Math.floor(minutes)) + ':' + n(Math.floor(seconds));
    return res;
  }

}

function n(n){
  return n > 9 ? "" + n: "0" + n;
}