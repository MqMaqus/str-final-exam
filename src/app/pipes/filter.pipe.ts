import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], phrase: string, key: string = ''): any {

    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    if (key && key !== 'id') {
      phrase = phrase.toLowerCase();
      return value.filter(item => String(item[key]).toLowerCase().includes(phrase));


    } else {
      phrase = ('' + phrase).toLowerCase();
      return value.filter(item => JSON.stringify(item).toLowerCase().includes(phrase));
    }
  }

}
