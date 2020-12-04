import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionCompactComponent } from './region-compact.component';

describe('RegionCompactComponent', () => {
  let component: RegionCompactComponent;
  let fixture: ComponentFixture<RegionCompactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionCompactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
