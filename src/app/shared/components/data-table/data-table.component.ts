import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ResizeObserverEntry } from 'ngx-resize-observer';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  containerSize: { width?: number; height?: number } = {};
  dialogOpen = false;

  constructor() {}

  ngOnInit(): void {}

  handleResize(event: ResizeObserverEntry): void {
    this.containerSize.width = event.contentRect?.width;
    this.containerSize.height = event.contentRect?.height;
  }
}
