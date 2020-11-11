import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { TimeZoneRegion } from './time-zone-region';
import { getTimeZones, TimeZone } from '@vvo/tzdb';
import { DateTimeService } from 'src/app/common/date-time.service';

@Injectable({
  providedIn: 'root',
})
export class TimeZoneService {
  constructor(private dateTimeService: DateTimeService) {}

  getTimeZones(targetDateTime: DateTime): TimeZoneRegion[] {
    const timeZones = getTimeZones();
    return this.sortTimeZone(this.groupTimeZone(timeZones, targetDateTime));
  }

  groupTimeZone(data: TimeZone[], targetDateTime: DateTime): TimeZoneRegion[] {
    const regionGroups = data.reduce((groups, item) => {
      const group = groups[item.currentTimeOffsetInMinutes] || [];
      group.push(item);
      groups[item.currentTimeOffsetInMinutes] = group;
      return groups;
    }, {});
    const result = Object.keys(regionGroups).map((key) => {
      const region = new TimeZoneRegion();
      region.timeZones = regionGroups[key];
      region.currentTimeOffsetInMinutes = Number(key);
      region.duration = this.dateTimeService.getDifferenceToTarget(
        region.primaryDateTime,
        targetDateTime
      );
      region.currentZoneIndex = 0;
      return region;
    });
    return result;
  }

  sortTimeZone(data: TimeZoneRegion[]): TimeZoneRegion[] {
    return data.sort(
      (a, b) => a.duration.as('seconds') - b.duration.as('seconds')
    );
  }

  getTimeZoneNames(zones: TimeZone[]): string[] {
    const names = zones.map((zone) => zone.name);
    return [...new Set(names)];
  }
}
