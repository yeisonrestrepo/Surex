import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[canada-phone-js]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: JavascriptOnlyDirective, multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JavascriptOnlyDirective), multi: true }
  ]
})
export class JavascriptOnlyDirective implements Validator, ControlValueAccessor {

  private onChange: Function;
  private onTouched: Function;
  private keyPressed!: number;

  private element: HTMLInputElement;
  private readonly BACKSPACECODE = 8;

  @HostListener('keydown', ['$event']) public onKeyDown(e: KeyboardEvent): void {
    this.keyPressed = e.keyCode;
    const value = this.element.value;
    if (value === '' && (this.keyPressed === 49 || this.keyPressed === 97)) {
      e.preventDefault();
    }
    e.stopImmediatePropagation();
  }

  @HostListener("input", ["$event"])
  onInput(event: Event) {
    event.stopImmediatePropagation();
    const value = this.element.value;
    this.renderer.setProperty(this.element, 'value', this.addFormat(value));
    this.onTouched();
    this.onChange(this.removeFormat(value, true));
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.onChange = (_: any) => { }
    this.onTouched = (_: any) => { }
    this.element = <HTMLInputElement>this.el.nativeElement;
  }

  writeValue(value: any): void {
    if (value) {
      this.renderer.setProperty(this.element, 'value', value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value)
    if (control.value !== '') {
      return null;
    } else {
      return { 'invalid': true };
    }
  }

  private addFormat(value: any) {
    if (typeof (value) == typeof (undefined))
      return value;

    let numbersOnly = this.removeFormat(value);
    let parsedValue = '';

    if (this.keyPressed === this.BACKSPACECODE && numbersOnly.length > 0) {
      parsedValue = value.slice(0, value.length);
    }

    // Separating the number phone into smaller pieces
    const areaCode = numbersOnly.substring(0, 3);
    const middle = numbersOnly.substring(3, 6);
    const last = numbersOnly.substring(6, 10);

    if (numbersOnly.length > 6) {
      parsedValue = `(${areaCode}) ${middle}-${last}`;
    }
    else if (numbersOnly.length > 3) { parsedValue = `(${areaCode}) ${middle}`; }
    else if (numbersOnly.length > 0) { parsedValue = `(${areaCode}`; }

    return parsedValue;
  }

  private removeFormat(value: any, isModelValue: boolean = false) {
    let numbersOnly = value.replace(/\D/g, '');
    numbersOnly = numbersOnly.substring(0, 10);
    if (isModelValue) {
      if (numbersOnly.length === 10) {
        return numbersOnly;
      }
      return ''
    }
    return numbersOnly;
  }

}
