import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChildren,
} from '@angular/core';

export interface ColumnConfig {
  field: string;
  header?:
    | string
    | TemplateRef<any>
    | ((field: string, col?: ColumnConfig) => string);
  content?:
    | TemplateRef<any>
    | ((value: any, row?: any, col?: ColumnConfig) => string | number);
}

interface InnerColumnConfig {
  id: string;
  field: string;
  headerString?: string;
  headerFunction?: (field: string, col?: ColumnConfig) => string;
  headerTemplate?: TemplateRef<any>;
  contentFunction?: (
    value: any,
    row?: any,
    col?: ColumnConfig
  ) => string | number;
  contentTemplate?: TemplateRef<any>;
}

type T = any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input()
  columns: ColumnConfig[] = [];

  @Input()
  data: T[] = [];

  innerColumns: InnerColumnConfig[] = [];
  viewPortItems: T[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.evaluateInnerColumns();
    }
  }

  private evaluateInnerColumns(): void {
    this.innerColumns = this.columns.map((col) => {
      return {
        id: btoa(`${col.field}`),
        field: col.field,
        headerString: typeof col.header === 'string' ? col.header : undefined,
        headerFunction:
          typeof col.header === 'function' ? col.header : undefined,
        headerTemplate:
          col.header instanceof TemplateRef ? col.header : undefined,
        contentFunction:
          typeof col.content === 'function' ? col.content : undefined,
        contentTemplate:
          col.content instanceof TemplateRef ? col.content : undefined,
      };
    });
  }

  trackByFn(index: number, item: T): number {
    return index;
  }
}
