import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DataTestModule } from './directives/data-test/data-test.module';

const library = [AngularCommonModule, DataTestModule];
@NgModule({
  declarations: [],
  imports: library,
  exports: library,
})
export class CommonModule {}
