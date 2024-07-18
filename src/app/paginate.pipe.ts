import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})


export class PaginatePipe implements PipeTransform {

  transform(value: any[], config: { itemsPerPage: number, currentPage: number }): any[] {
    const { itemsPerPage, currentPage } = config;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return value.slice(startIndex, startIndex + itemsPerPage);
  }

}
