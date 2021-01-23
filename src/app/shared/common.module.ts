import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DataAngularModule } from './directives/data-angular/data-angular.module';

const library = [AngularCommonModule, DataAngularModule];
@NgModule({
  declarations: [],
  imports: library,
  exports: library,
})
export class CommonModule {}
