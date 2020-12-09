import { ConfigureComponent } from './configure/configure.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';

const routes: Routes = [
  { path: '', component: CountdownComponent },
  { path: 'countdown', component: CountdownComponent },
  { path: 'list', component: ListComponent },
  { path: 'configure', component: ConfigureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
