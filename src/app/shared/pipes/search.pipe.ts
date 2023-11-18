import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(words: any = [], filterText: string = '') {
    if (words.length === 0 || filterText === '') {
      return words;
    } else {
      return words.filter((users: any) => {
        return (
          users.Name.indexOf(filterText.trim()) > -1 ||
          users.Email.indexOf(filterText.trim()) > -1
        );
      });
    }
  }
}
