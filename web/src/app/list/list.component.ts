import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DateTime } from 'luxon';
import { map } from 'rxjs/operators';
import { TimeZone } from '@vvo/tzdb';
import { TimeZoneService } from 'src/app/timezone/time-zone.service';
import { TimeZoneRegion } from 'src/app/timezone/time-zone-region';
import { DateTimeService } from 'src/app/common/date-time.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  eventName: string;
  targetTime: DateTime;
  timeZoneRegions: TimeZoneRegion[];

  private timerSubscription: Subscription;
  constructor(
    private timeZoneService: TimeZoneService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadData(): void {
    this.eventName = 'New Years';
    this.targetTime = DateTime.fromObject({
      year: DateTime.local().year + 1,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
    });
    this.timeZoneRegions = this.timeZoneService.getTimeZones(this.targetTime);

    const timer = interval(1000).pipe(
      map((intervalValue) => this.advanceCountdown(intervalValue))
    );
    this.timerSubscription = timer.subscribe();
  }

  advanceCountdown(intervalValue: number): void {
    const advanceName = intervalValue % 5 === 0;
    this.timeZoneRegions = this.timeZoneRegions.map(
      (region: TimeZoneRegion): TimeZoneRegion => {
        region.duration = this.dateTimeService.getDifferenceToTarget(
          region.primaryDateTime,
          this.targetTime
        );
        region.currentZoneIndex = advanceName
          ? this.getNextTimeZoneIndex(region.timeZones, region.currentZoneIndex)
          : region.currentZoneIndex;
        return region;
      }
    );
  }

  getNextTimeZoneIndex(timeZones: TimeZone[], index: number): number {
    let nextIndex = index + 1;
    if (nextIndex > timeZones.length - 1) {
      nextIndex = 0;
    }
    return nextIndex;
  }
}
