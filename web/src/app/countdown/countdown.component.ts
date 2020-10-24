import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take, map } from 'rxjs/operators';

export interface CountdownTime {
  offset: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdownTime$: Observable<CountdownTime>;
  private sub: Subscription;

  constructor() {}

  ngOnInit(): void {
    const timer = interval(1000).pipe(map(() => this.getCountdown()));
    timer.subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCountdown(): void {
    const dateFuture = new Date(new Date().getFullYear() + 1, 0, 1);
    const dateNow = new Date();

    const offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let seconds = Math.floor((dateFuture.getTime() - dateNow.getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    this.countdownTime$ = of({
      offset,
      days,
      hours,
      minutes,
      seconds,
    });
  }
}
