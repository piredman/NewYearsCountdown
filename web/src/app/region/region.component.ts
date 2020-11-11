import { TimeZoneRegion } from 'src/app/timezone/time-zone-region';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
})
export class RegionComponent implements OnInit {
  @Input() eventName: string;
  @Input() data: TimeZoneRegion;

  constructor() {}

  ngOnInit(): void {}

  get celebrate(): boolean {
    if (!this.data?.duration) {
      return false;
    }

    return Math.floor(this.data.duration.as('seconds')) < 0;
  }
}
