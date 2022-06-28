import { Component } from '@angular/core';
import { WatcherDirective } from '../shared/directives/watcher.directive';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  providers: [WatcherDirective]
})
export class WatchComponent {

  changer: any = '';
  prop1: string = '';
  prop2: number = 0;

  example = `
    export default function SampleDirective() {
        return {
            restrict: 'E',
            template: require(' ./sample.html'),
            scope: {
                ngModel: '='
            },
            require: 'ngModel', 
            link: function($scope) (
            
            // Watch expression
            $scope.$watch('ngModel.property', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    console.log('Value has changed to: ' + newValue);
                }
            });
        }
    }`;

}
