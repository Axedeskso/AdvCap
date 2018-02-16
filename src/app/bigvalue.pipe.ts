import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bigvalue'
})
export class BigvaluePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let res: string;
    if (value < 1000)
      res = value.toFixed(2) + " $";
    else if (value >= 1000 && value < 1000000)
      res = (value / 1000).toFixed(2) + "K $";
    else if (value >= 1000000 && value < 1000000000)
      res = (value / 1000000).toFixed(2) + "M $";
    else if (value >= 1000000000 && value < 1000000000000)
      res = (value / 1000000000).toFixed(2) + "G $";
    else if (value >= 1000000000000 && value < 1000000000000000)
      res = (value / 1000000000000).toFixed(2) + "T $";
    else if (value >= 1000000000000000 && value < 1000000000000000000)
      res = (value / 1000000000000000).toFixed(2) + "P $";
    else if (value >= 1000000000000000000 && value < 1000000000000000000000)
      res = (value / 1000000000000000000).toFixed(2) + "E $";
    //else if (value >= 1000000000000000000)
      //res = value.toFixed(2);
      //res = res.replace(/e\+(.*)/, " 10<sup>$1</sup>");
    return res;
  }

}
