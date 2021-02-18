import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { polling } from 'src/utils/rxjs.utils';
import { TaskApiService } from '../../api/task-api.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit {
  readonly fetchTrigger$ = new Subject();
  readonly tasks$ = this.api.getTasks().pipe(polling(5000, this.fetchTrigger$));

  constructor(private api: TaskApiService) {}

  ngOnInit(): void {}

  delete(item: TaskModel): void {
    this.api.deleteTask(item.id).subscribe((_) => {
      this.fetchTrigger$.next();
    });
  }
}
