import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'idTemplate'})
export class IdTempltePipe implements PipeTransform {

  transform(id: number): string {
    return id.toString().replace(/(\d{1,3}?)(\d{1,3})$/, '$1 $2');
  }
}
