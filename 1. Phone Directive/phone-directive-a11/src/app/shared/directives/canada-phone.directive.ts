import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, NgModel, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[canada-phone]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CanadaPhoneDirective, multi: true }, [NgModel]]
})
export class CanadaPhoneDirective implements Validator {
  private _keyPressed!: number;
  private readonly _BACKSPACECODE = 8;

  @HostListener('keydown', ['$event']) public onKeyDown(e: KeyboardEvent): void {
    this._keyPressed = e.keyCode;
    e.stopImmediatePropagation();
  }

  constructor(private el: ElementRef) { }

  public validate(control: AbstractControl): ValidationErrors | null {
    const input: HTMLInputElement = <HTMLInputElement>this.el.nativeElement;

    // Regular expressions to match the number format each stage
    const areaCodeRegExp = /^(\d{3})$/g;
    const midPhoneRegExp = /^(\d{3})(\d{3})$/g;
    const midExpectedRegExp = /^\((\d{3})\)(\s)(\d{3})-$/g;
    const phoneRegExp = /^(\d{3})(\d{3})(\d{4})$/g;
    const phoneExpectedRegExp = /^\((\d{3})\)(\s)(\d{3})-(\d{4})$/g;

    // Handle the format across all validations
    let formatted = '';

    // Makes sure the control is initialized and contains some value
    if (!control || !input.value) {
      return null;
    }

    // Reset the format from the input by taking only numbers
    const inputValueOnlyNumbers = input.value.replace(/\D/g, '');

    // Verifying the input length to restrict the input size
    if (inputValueOnlyNumbers.length > 10) {
      control.setValue(inputValueOnlyNumbers.substring(0, 10), { emitEvent: false });
      return null;
    }

    // First character cannot start with 1
    if (inputValueOnlyNumbers.length === 1 && inputValueOnlyNumbers === '1') {
      control.setValue('', { emitEvent: false });
      return null;
    }

    // Removing the last value from the input
    if (this._keyPressed === this._BACKSPACECODE && control.value.length > 0) {
      const resetLength = input.value.slice(0, 10);
      input.value = resetLength;
    } else if (inputValueOnlyNumbers.length > 0 && inputValueOnlyNumbers.length <= 3) { // Formatting phone area code
      formatted = inputValueOnlyNumbers.replace(areaCodeRegExp, '($1) ');
      input.value = formatted;
    } else if (inputValueOnlyNumbers.length > 3 && inputValueOnlyNumbers.length <= 6) { // Formatting phone area+mid numbers
      formatted = inputValueOnlyNumbers.replace(midPhoneRegExp, '($1) $2-')
      if (midExpectedRegExp.test(formatted)) {
        input.value = formatted;
      }
    } else if (inputValueOnlyNumbers.length > 6 && inputValueOnlyNumbers.length <= 10) { // Formatting phone local number
      formatted = inputValueOnlyNumbers.replace(phoneRegExp, '($1) $2-$3');
      if (phoneExpectedRegExp.test(formatted)) {
        input.value = formatted;
        return { 'invalid': false }
      }
    }

    // setting the number without format to the ngModel
    if (control.value.length !== inputValueOnlyNumbers.length) {
      control.setValue(inputValueOnlyNumbers, { emitEvent: false });
    }

    // The default state of the input will be invalid unless 
    // the number contains 10 characters and the local number format
    return { 'invalid': true }; // otherwise it's invalid
  }
}
