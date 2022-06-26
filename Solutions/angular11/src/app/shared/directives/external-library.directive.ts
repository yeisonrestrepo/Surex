import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { AsYouType } from 'libphonenumber-js';

@Directive({
  selector: '[canada-phone-ext]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ExternalLibraryDirective, multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ExternalLibraryDirective), multi: true }
  ]
})
export class ExternalLibraryDirective implements Validator, ControlValueAccessor {
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

    parsedValue = new AsYouType('US').input(numbersOnly); // format the numbers as you type

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
