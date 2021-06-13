import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

type Template = TemplateRef<never>;

export interface ColumnConfig<T> {
  field: keyof T | string;
  header?:
    | string
    | Template
    | ((field: keyof T | string, col?: ColumnConfig<T>) => string);
  content?:
    | Template
    | ((value: T[keyof T], row?: T, col?: ColumnConfig<T>) => string | number);
}

interface InnerColumnConfig<T> {
  id: string;
  field: string; // keyof T | string;
  headerString?: string;
  headerFunction?: (field: keyof T | string, col?: ColumnConfig<T>) => string;
  headerTemplate?: Template;
  contentFunction?: (
    value: T[keyof T],
    row?: T,
    col?: ColumnConfig<T>
  ) => string | number;
  contentTemplate?: Template;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T> implements OnInit, OnChanges {
  @Input()
  columns: ColumnConfig<T>[] = [];

  @Input()
  data: T[] = [];

  innerColumns: InnerColumnConfig<T>[] = [];
  viewPortItems: T[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @angular-eslint/no-empty-lifecycle-method
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
        field: col.field as string,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trackByFn(index: number, item: T): number {
    return index;
  }
}
