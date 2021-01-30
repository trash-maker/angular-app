import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CommonModule } from './shared/common.module';
import { DataTableModule } from './shared/components/data-table/data-table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, CommonModule, DataTableModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
