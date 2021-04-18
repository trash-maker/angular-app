import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { loading } from 'src/utils/rxjs.utils';
import { TaskApiService } from '../../api/task-api.service';
import { TaskResolveGuard } from '../../guard/task-resolve.guard';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPageComponent implements OnInit {
  readonly fetchTrigger$: Subject<never> = this.route.snapshot.data[
    TaskResolveGuard.dataTriggerField
  ];
  readonly task$: Observable<TaskModel> = this.route.snapshot.data[
    TaskResolveGuard.dataField
  ];

  readonly loading = {
    edit$: new BehaviorSubject<boolean>(false),
  };

  constructor(private api: TaskApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  edit(task: TaskModel): void {
    this.api
      .patchTask(task.id, {
        status: ['work', 'done', 'todo'][Math.floor(Math.random() * 3)],
      })
      .pipe(loading(this.loading.edit$))
      .subscribe({ next: (t) => this.fetchTrigger$.next() });
  }
}
