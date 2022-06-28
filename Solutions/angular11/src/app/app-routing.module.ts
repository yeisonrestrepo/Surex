import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { PhonesComponent } from './phones/phones.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'phones', component: PhonesComponent },
  { path: 'watch', component: WatchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
