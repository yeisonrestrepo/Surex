import { Component, ViewEncapsulation } from '@angular/core';
import { CanadaPhoneDirective } from '../shared/directives/canada-phone.directive';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss'],
  providers: [CanadaPhoneDirective],
  encapsulation: ViewEncapsulation.None
})
export class PhonesComponent {
  phone: any = '';
  phoneNumberJS: any = '';
  phoneNumberExt: any = '';

}
