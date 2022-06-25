import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { AsYouType } from 'libphonenumber-js';

@Directive({
  selector: '[canada-phone-ext]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ExternalLibraryDirective, multi: true }]
})
export class ExternalLibraryDirective implements Validator {
  private _keyPressed!: number;
  private readonly _BACKSPACECODE = 8;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) public onKeyDown(e: any): void {
    this._keyPressed = e.keyCode;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const input: HTMLInputElement = <HTMLInputElement>this.el.nativeElement;
    let formatted = '';
    const regEx = /[0-9]/g;
    if (!control || !control.value) {
      return null;
    }

    if (control.value && control.value[control.value.length - 1] === ' ') {
      this._keyPressed = 0;
    }

    if (this._keyPressed === this._BACKSPACECODE && control.value.length > 0) {
      const resetLength = input.value.slice(0, 10);
      input.value = resetLength;
    }

    formatted = new AsYouType('US').input(control.value); // format the numbers as you type
    const numbersOnly = control.value.replace(/\D/g, '');

    if (numbersOnly.length > 10) {
      control.setValue(numbersOnly.substring(0, 10), { emitEvent: false });
      return null;
    }

    // First character cannot start with 1
    if (input.value.length === 1 && input.value === '1') {
      control.setValue('', { emitEvent: false });
      return null;
    }

    // setting the number without format to the ngModel
    if (control.value.length !== numbersOnly.length) {
      control.setValue(numbersOnly, { emitEvent: false });
    }

    if (formatted !== control.value) {
      input.value = formatted; // send back the formatted number
    }

    if (formatted.length === 0) { // if they start to enter a number by mistake and want to delete the value back to nothing
      return null;
    } else if (formatted.match(regEx)) {
      const digitCount = formatted.match(regEx)?.length || 0;
      if (digitCount > 10) { // if the count of numbers is between 10 and 13 then it's valid
        return null;
      }
    }

    return { 'invalid': true }; // otherwise it's invalid
  }

}
