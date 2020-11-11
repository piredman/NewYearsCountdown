import { Injectable } from '@angular/core';
import { DateTime, Duration } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  getDifferenceToTarget(from: DateTime, to: DateTime): Duration {
    const fromDateTime = from ?? DateTime.local();
    const toDateTime = to ?? DateTime.local();

    const localTarget = DateTime.fromObject({
      year: toDateTime.year,
      month: toDateTime.month,
      day: toDateTime.day,
      hour: toDateTime.hour,
      minute: toDateTime.minute,
      second: toDateTime.second,
      zone: fromDateTime.zone,
    });
    return localTarget.diff(fromDateTime, [
      'days',
      'hours',
      'minutes',
      'seconds',
    ]);
  }
}
