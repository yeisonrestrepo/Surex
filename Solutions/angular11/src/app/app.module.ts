import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanadaPhoneDirective } from './shared/directives/canada-phone.directive';
import { JavascriptOnlyDirective } from './shared/directives/javascript-only.directive';
import { ExternalLibraryDirective } from './shared/directives/external-library.directive';
import { WatcherDirective } from './shared/directives/watcher.directive';
import { AppRoutingModule } from './app-routing.module';
import { PhonesComponent } from './phones/phones.component';
import { WatchComponent } from './watch/watch.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    CanadaPhoneDirective,
    JavascriptOnlyDirective,
    ExternalLibraryDirective,
    WatcherDirective,
    PhonesComponent,
    WatchComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
