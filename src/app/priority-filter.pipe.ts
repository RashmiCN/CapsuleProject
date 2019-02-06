import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityFilter'
})
export class PriorityFilterPipe implements PipeTransform {

  transform(inputArray: any[], sRange: number, eRange: number): any {
    // console.log(inputArray);
    // console.log("Priority filter");
    // console.log(sRange);
    // console.log(eRange);
    // console.log(inputArray.filter(item => item.priority >= sRange && item.priority <= eRange));
    if (sRange == null && eRange == null) {
      return inputArray;
    } else if (sRange != null && eRange == null) {
      return inputArray.filter(item => item.priority >= sRange);
    } else if (sRange == null && eRange != null) {
      return inputArray.filter(item =>  item.priority <= eRange);
    } else {
      return inputArray.filter(item => item.priority >= sRange && item.priority <= eRange);
    }
  }


}
