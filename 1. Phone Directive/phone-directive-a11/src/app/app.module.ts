import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanadaPhoneDirective } from './shared/directives/canada-phone.directive';
import { JavascriptOnlyDirective } from './shared/directives/javascript-only.directive';
import { ExternalLibraryDirective } from './shared/directives/external-library.directive';

@NgModule({
  declarations: [
    AppComponent,
    CanadaPhoneDirective,
    JavascriptOnlyDirective,
    ExternalLibraryDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
