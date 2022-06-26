import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, NgModel, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[canada-phone-js]',
  providers: [{ provide: NG_VALIDATORS, useExisting: JavascriptOnlyDirective, multi: true }, [NgModel]]
})
export class JavascriptOnlyDirective implements Validator {

  constructor(private el: ElementRef) { }

  validate(control: AbstractControl): ValidationErrors | null {

    const inputEl = (<HTMLInputElement>this.el.nativeElement);
    const input = inputEl.value.replace(/\D/g, ''); // First ten digits of input only

    // Makes sure the control is initialized and contains some value
    if (!control || !input) {
      return null;
    }

    // Verifying the input length to restrict the input size
    if (input.length > 10) {
      control.setValue(input.substring(0, 10), { emitEvent: false });
      return null;
    }

    // First character cannot start with 1
    if (input.length === 1 && input === '1') {
      control.setValue('', { emitEvent: false });
      return null;
    }

    // Separating the number phone into smaller pieces
    const areaCode = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    // setting the number without format to the ngModel
    if (control.value.length !== input.length) {
      control.setValue(input, { emitEvent: false });
    }

    if (input.length > 6) {
      inputEl.value = `(${areaCode}) ${middle}-${last}`;
      return { 'invalid': false }
    }
    else if (input.length > 3) { inputEl.value = `(${areaCode}) ${middle}`; }
    else if (input.length > 0) { inputEl.value = `(${areaCode}`; }

    return { 'invalid': true }
  }

}
