import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DataTestModule } from './directives/data-test/data-test.module';
import { NgxResizeObserverModule } from 'ngx-resize-observer';

const library = [AngularCommonModule, NgxResizeObserverModule, DataTestModule];
@NgModule({
  declarations: [],
  imports: library,
  exports: library,
})
export class CommonModule {}
