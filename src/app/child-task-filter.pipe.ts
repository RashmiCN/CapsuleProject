import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from 'src/app/add-task/Task';

@Pipe({
  name: 'childTaskFilter'
})
export class ChildTaskFilterPipe implements PipeTransform {

  transform(inputArray: any[] , searchString: string ): any {
    // console.log(inputArray);
    // console.log("after filter");
    // console.log(searchString);
    // console.log(inputArray.filter(item => item.taskName.indexOf(searchString) !== -1));
    if (searchString == null) {
      return inputArray;
    }else{
    return inputArray.filter(item => item.taskName.indexOf(searchString) !== -1);
    }
  }
}
