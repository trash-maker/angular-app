import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAngularDirective } from './data-angular.directive';

const definitions = [DataAngularDirective];

@NgModule({
  declarations: definitions,
  imports: [CommonModule],
  exports: definitions,
})
export class DataAngularModule {}
