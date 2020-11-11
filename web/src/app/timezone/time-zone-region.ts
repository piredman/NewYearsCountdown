import { TimeZone } from '@vvo/tzdb';
import { DateTime, Duration } from 'luxon';

export class TimeZoneRegion {
  currentTimeOffsetInMinutes: number;
  duration: Duration;
  currentZoneIndex: number;
  timeZones: TimeZone[];

  get timeZoneName(): string {
    if (this.currentZoneIndex > this.timeZones.length - 1) {
      return '';
    }

    return this.timeZones[this.currentZoneIndex].name;
  }

  get primaryDateTime(): DateTime {
    return this.getTimeFromOffset(this.timeZones);
  }

  get timeZoneNames(): string[] {
    const names = this.timeZones.map((zone) => zone.name);
    return [...new Set(names)];
  }

  private getTimeFromOffset(timeZones: TimeZone[]): DateTime {
    if (timeZones.length <= 0) {
      return;
    }

    const timeZone = timeZones[0];
    return DateTime.local().setZone(timeZone.name);
  }
}
