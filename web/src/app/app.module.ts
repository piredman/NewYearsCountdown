import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { DateTimePipe } from './common/date-time.pipe';
import { RegionComponent } from './region/region.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ConfigureComponent } from './configure/configure.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegionCompactComponent } from './region-compact/region-compact.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DateTimePipe,
    RegionComponent,
    CountdownComponent,
    ConfigureComponent,
    RegionCompactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
