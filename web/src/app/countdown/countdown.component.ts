import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeZone } from '@vvo/tzdb';
import { DateTime, Duration } from 'luxon';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTimeService } from '../common/date-time.service';
import { TimeZoneRegion } from '../timezone/time-zone-region';
import { TimeZoneService } from '../timezone/time-zone.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  eventName: string;
  targetTime: DateTime;
  targetTimeBuffer = 55;
  display = '';
  celebrate = false;
  celebrateOverride = false;
  celebrating = false;
  audio: HTMLAudioElement;

  timeZoneGroups: TimeZoneRegion[];
  timeZoneRegion: TimeZoneRegion;

  private timerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private timeZoneService: TimeZoneService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src = '/assets/farting-around.mp3';
    this.audio.load();
    this.audio.addEventListener('ended', this.stopCelebrating);

    this.route.queryParamMap.subscribe((params) => {
      this.eventName = this.asString(params.get('event'), 'New Years');
      this.targetTime = DateTime.fromObject({
        year: this.asNumber(params.get('year'), DateTime.local().year + 1),
        month: this.asNumber(params.get('month'), 1),
        day: this.asNumber(params.get('day'), 1),
        hour: this.asNumber(params.get('hour'), 0),
        minute: this.asNumber(params.get('minute'), 0),
        second: this.asNumber(params.get('second'), 0),
      });

      this.display = this.asString(params.get('display'), '').toUpperCase();
      this.celebrateOverride = this.asBoolean(params.get('celebrate'), false);
      console.log(`celebrateOverride: ${this.celebrateOverride}`);

      this.load();
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  asString(value: string, fallback: string): string {
    if (!value) {
      return fallback;
    }

    return value;
  }

  asNumber(value: string, fallback: number): number {
    if (!value) {
      return fallback;
    }

    const result = Number(value);
    return isNaN(result) ? fallback : result;
  }

  asBoolean(value: string, fallback: boolean): boolean {
    console.log(`celebrate: ${value}`);
    if (!value) {
      return fallback;
    }

    return value === 'true';
  }

  load(): void {
    this.timeZoneGroups = this.timeZoneService.getTimeZones(this.targetTime);

    const timer = interval(1000).pipe(
      map((intervalValue) => {
        const activeTimeZoneGroup = this.getActiveTimeZoneGroup(
          this.timeZoneGroups
        );
        this.celebrate = this.celebrateOverride
          ? this.celebrateOverride
          : this.isWithinBuffer(activeTimeZoneGroup.duration);
        if (this.celebrate && !this.celebrating) {
          this.startCelebrating();
        }
        return this.advanceActiveTimeZone(
          activeTimeZoneGroup,
          intervalValue,
          this.celebrate ? 1 : 5
        );
      })
    );
    this.timerSubscription = timer.subscribe();
  }

  isWithinBuffer(duration: Duration): boolean {
    if (!duration) {
      return false;
    }

    return Math.floor(duration.as('seconds')) <= 0;
  }

  startCelebrating(): void {
    if (this.celebrating) {
      return;
    }

    this.celebrating = true;
    this.audio.currentTime = 0;
    // this.audio.play();
  }

  stopCelebrating(): void {
    this.celebrating = false;
  }

  advanceActiveTimeZone(
    group: TimeZoneRegion,
    intervalValue: number,
    tickSpeed: number
  ): void {
    const advanceName = intervalValue % tickSpeed === 0;
    group.currentZoneIndex = advanceName
      ? this.getNextTimeZoneIndex(group.timeZones, group.currentZoneIndex)
      : group.currentZoneIndex;
    group.duration = this.dateTimeService.getDifferenceToTarget(
      group.primaryDateTime,
      this.targetTime
    );

    this.timeZoneRegion = group;
  }

  getActiveTimeZoneGroup(groups: TimeZoneRegion[]): TimeZoneRegion {
    return groups.find((group) => {
      return (
        Math.floor(
          group.duration.plus({ seconds: this.targetTimeBuffer }).as('seconds')
        ) > 0
      );
    });
  }

  getNextTimeZoneIndex(timeZones: TimeZone[], index: number): number {
    let nextIndex = index + 1;
    if (nextIndex > timeZones.length - 1) {
      nextIndex = 0;
    }
    return nextIndex;
  }
}
