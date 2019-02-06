import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRangeFilter'
})
export class DateRangeFilterPipe implements PipeTransform {

  transform(inputArray: any[], sDate: Date, eDate: Date): any {
    // console.log(inputArray);
    // console.log("date filter");
    // console.log(new Date(sDate));
    // console.log(new Date(eDate));
    // console.log(inputArray.filter(item => item.startDate >= new Date(sDate) && item.endDate <= new Date(eDate)));
    if (sDate == null && eDate == null) {
      return inputArray;
    } else if (sDate != null && eDate == null) {
      return inputArray.filter(item => item.startDate >= new Date(sDate));
    } else if (sDate == null && eDate != null) {
      return inputArray.filter(item => item.endDate <= new Date(eDate));
    } else {
      return inputArray.filter(item => item.startDate >= new Date(sDate) && item.endDate <= new Date(eDate));
    }
  }

}
