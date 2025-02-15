import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; // Return if value is null or undefined
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
