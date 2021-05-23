import { NgModule } from '@angular/core';
import { CommonModule } from '@app/shared/common.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { DataTableComponent } from './data-table.component';

@NgModule({
  declarations: [DataTableComponent],
  imports: [CommonModule, VirtualScrollerModule],
  exports: [DataTableComponent],
})
export class DataTableModule {}
