import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { polling } from 'src/utils/rxjs.utils';
import { TaskApiService } from '../api/task-api.service';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskResolver implements Resolve<Observable<TaskModel>> {
  static pathParam = 'id';

  constructor(private router: Router, private api: TaskApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Observable<TaskModel>>
    | Promise<Observable<TaskModel>>
    | Observable<TaskModel> {
    const id = route && route.params && +route.params[TaskResolver.pathParam];
    if (id === null || id === undefined) {
      this.router.navigateByUrl('/not-found', {
        skipLocationChange: true,
      });
      return throwError(
        new Error(`Parameter '${TaskResolver.pathParam}' not found`)
      );
    }

    route.data = {
      ...route.data,
      trigger$: route.data.trigger$ || new Subject(),
    };
    const data$: Observable<TaskModel> =
      route.data.task ||
      this.api.getTask(id).pipe(polling(5000, route.data.trigger$));

    return data$.pipe(
      first(),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 404:
            this.router.navigateByUrl('/not-found', {
              skipLocationChange: true,
            });
            break;
          default:
            this.router.navigateByUrl('/error', {
              skipLocationChange: true,
            });
        }
        return throwError(error);
      }),
      map((value) => data$)
    );
  }
}
