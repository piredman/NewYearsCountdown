import { DateTime } from 'luxon';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
  transform(value: DateTime, ...args: unknown[]): string {
    return value.toLocaleString(DateTime.DATETIME_FULL);
  }
}
