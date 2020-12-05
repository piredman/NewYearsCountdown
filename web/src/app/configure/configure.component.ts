import { DatePipe } from '@angular/common';
import { DateTime } from 'luxon';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss'],
})
export class ConfigureComponent implements OnInit {
  eventName = new FormControl();
  eventDate = new FormControl();
  display = new FormControl();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.eventName.setValue('New Years');

    const newYears = DateTime.fromObject({
      year: DateTime.local().year + 1,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
    });
    const datePipe = new DatePipe(navigator.language);
    this.eventDate.setValue(
      datePipe.transform(newYears.toJSDate(), 'y-MM-ddThh:mm')
    );
    this.display.setValue(false);
  }

  get displayValue(): string {
    return this.display.value ? 'Compact' : 'Full';
  }

  onOpen(): void {
    const eventName = this.eventName.value;
    const jsDate = new Date(this.eventDate.value);
    const eventDate = DateTime.fromJSDate(jsDate);

    const queryParams: any = {
      event: eventName,
      year: eventDate.year,
      month: eventDate.month,
      day: eventDate.day,
      hour: eventDate.hour,
      minute: eventDate.minute,
      second: eventDate.second,
    };

    if (this.display.value) {
      queryParams.display = 'compact';
    }

    this.router.navigate(['/countdown'], {
      queryParams,
    });
  }
}
