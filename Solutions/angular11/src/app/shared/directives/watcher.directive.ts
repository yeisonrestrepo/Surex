import { Directive, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[watcher]'
})
export class WatcherDirective implements OnChanges {

  @Input() property1!: string;
  @Input() property2!: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let property1: SimpleChange = changes.property1;

    if (property1.previousValue !== property1.currentValue) {
      console.log(`Value has changed to: ${property1.currentValue}`);
      
    }
  }

}
