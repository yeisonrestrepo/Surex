import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AbstractControl, NgModel, NG_VALIDATORS, PatternValidator, ValidationErrors, Validator, Validators } from '@angular/forms';
import { AsYouType } from 'libphonenumber-js';

@Directive({
  selector: '[canada-phone]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CanadaPhoneDirective, multi: true }, [NgModel]]
})
export class CanadaPhoneDirective implements Validator {
  private _numberControl!: AbstractControl;
  private _keyPressed!: number;
  private readonly _BACKSPACECODE = 8;
  private _keyboarEvent!: KeyboardEvent;


  @HostListener('keydown', ['$event']) public onKeyDown(e: any): void {
    this._keyPressed = e.keyCode;
  }

  constructor(private el: ElementRef) {}

  public validate(control: AbstractControl): ValidationErrors | null {
    let formatted = '';
    const regEx = /[0-9]/g;
    const areaCodeRegExp = /^(\d{3})$/g;
    const midPhoneRegExp = /^\d{3}$/g;
    const input: HTMLInputElement = <HTMLInputElement>this.el.nativeElement;
    const phoneRegExp = /^(\d{3})(\s)(\d{3})-(\d{4})$/g;
    const phoneFormat = '($1) $2-$3';

    if (!control || !control.value) {
      return null;
    }

    // First character cannot start with 1
    if (control.value.length === 1 && control.value === '1') {
      control.setValue('', { emitEvent: false })
      return null;
    }

    
    if (control.value.length > 0 && control.value.length <= 3) {
      const areaCode = control.value.replace(areaCodeRegExp, '($1) ')
      input.nodeValue = areaCode;
    }
    
    if (control.value.length > 3 && control.value.length <= 6) {
      console.log('entra aquí')
      // const areaMid = new RegExp(areaCodeRegExpmidPhoneRegExp)
      // const some = control.value.replace(areaMid, '$1 -$2')
      // console.log(some);
      // input.value = areaCode;
    }
    // console.log(control.)

    // if (control.value && control.value[control.value.length - 1] === ' ') {
    //   this._keyPressed = 0;
    // }
    // if (this._keyPressed === this._BACKSPACECODE && control.value && control.value[control.value.length - 1] === ')') {
    //   control.setValue(control.value.substring(0, control.value.length - 2), { emitEvent: false });
    // }

    // formatted = new AsYouType('CA').input(control.value); // format the numbers as you type
    // if (formatted !== control.value) {
    //   control.setValue(formatted, { emitEvent: false }); // send back the formatted number
    // }
    // if (formatted.length === 0) { // if they start to enter a number by mistake and want to delete the value back to nothing
    //   return null;
    // } else if (formatted.match(regEx)) {
    //   const digitCount = formatted.match(regEx)?.length || 0;
    //   // console.log(formatted.match(regEx)?.join(','))
    //   if (digitCount > 10) { // if the count of numbers is between 10 and 13 then it's valid
    //     control.setErrors({ invalid: true });
    //     control.updateValueAndValidity();
    //     return null;
    //   }
    // }

    return { 'invalid': true }; // otherwise it's invalid
  }
}
