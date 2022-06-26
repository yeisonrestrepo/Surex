import { Component } from '@angular/core';
import { CanadaPhoneDirective } from './shared/directives/canada-phone.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CanadaPhoneDirective]
})
export class AppComponent {
  phone: any = '';
  phoneNumberJS: any = '';
  phoneNumberExt: any = '';
}
