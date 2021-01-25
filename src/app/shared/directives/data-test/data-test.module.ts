import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTestDirective } from './data-test.directive';

const definitions = [DataTestDirective];

@NgModule({
  declarations: definitions,
  imports: [CommonModule],
  exports: definitions,
})
export class DataTestModule {}
