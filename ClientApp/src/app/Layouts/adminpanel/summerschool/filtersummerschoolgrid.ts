import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchsummerschoolfilter'
})
export class SearchSummerfilterPipe implements PipeTransform {


  transform(items: any[], field: string): any[] {
    debugger;
    if (!items) return [];
    if (field != undefined) {
      return items.filter(it => {

        return JSON.stringify(it).toLocaleLowerCase().indexOf(field.toLocaleLowerCase()) !== -1;
      });
    }
    //else {
    //  if (!value || value.length === 0) return items;
    //  return items.filter(e => e[field].toLowerCase().includes(value.toLocaleLowerCase()));
    //}

  }

}
