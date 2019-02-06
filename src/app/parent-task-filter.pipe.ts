import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentTaskFilter'
})
export class ParentTaskFilterPipe implements PipeTransform {

  transform(inputArray: any[], searchString: string): any {
    // console.log(inputArray);
    // console.log("after parent filter");
    // console.log(searchString);
    // console.log(inputArray.filter(item => item.parentTaskName.indexOf(searchString) !== -1));
    if (searchString == null) {
      return inputArray;
    } else {
      return inputArray.filter(item => item.parentTaskName.indexOf(searchString) !== -1);
    }
  }
}
