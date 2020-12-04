import { TimeZoneRegion } from 'src/app/timezone/time-zone-region';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-region-compact',
  templateUrl: './region-compact.component.html',
  styleUrls: ['./region-compact.component.scss'],
})
export class RegionCompactComponent implements OnInit {
  @Input() eventName: string;
  @Input() data: TimeZoneRegion;
  @Input() celebrateOverride: boolean;

  constructor() {}

  ngOnInit(): void {}

  get celebrate(): boolean {
    if (this.celebrateOverride) {
      return true;
    }

    if (!this.data?.duration) {
      return false;
    }

    return Math.floor(this.data.duration.as('seconds')) < 0;
  }
}
