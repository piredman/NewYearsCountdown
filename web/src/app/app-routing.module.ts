import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';

const routes: Routes = [
  { path: '', redirectTo: 'countdown', pathMatch: 'full' },
  { path: 'countdown', component: CountdownComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
