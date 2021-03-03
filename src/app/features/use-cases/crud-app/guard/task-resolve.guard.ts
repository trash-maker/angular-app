import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { polling } from 'src/utils/rxjs.utils';
import { TaskApiService } from '../api/task-api.service';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskResolveGuard implements CanActivate {
  static dataField = 'task.data$';
  static dataTriggerField = 'task.trigger$';
  static pathParam = 'id';

  constructor(
    private location: Location,
    private router: Router,
    private api: TaskApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const id =
      route && route.params && +route.params[TaskResolveGuard.pathParam];
    if (id === null || id === undefined) {
      this.router
        .navigateByUrl('/not-found', {
          skipLocationChange: true,
        })
        .then((_) => this.location.replaceState(state.url));
      return throwError(
        new Error(`Parameter '${TaskResolveGuard.pathParam}' not found`)
      );
    }

    const trigger$ =
      route.data[TaskResolveGuard.dataTriggerField] || new Subject();
    const data$: Observable<TaskModel> =
      route.data[TaskResolveGuard.dataField] ||
      this.api.getTask(id).pipe(polling(5000, trigger$));

    return data$.pipe(
      first(),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 404:
            this.router
              .navigateByUrl('/not-found', {
                skipLocationChange: true,
                state: {
                  error,
                },
              })
              .then((_) => this.location.replaceState(state.url));
            break;
          default:
            this.router
              .navigateByUrl('/error', {
                skipLocationChange: true,
                state: {
                  error,
                },
              })
              .then((_) => this.location.replaceState(state.url));
        }
        return throwError(error);
      }),
      map((value) => {
        route.data = {
          ...route.data,
          [TaskResolveGuard.dataField]: data$,
          [TaskResolveGuard.dataTriggerField]: trigger$,
        };
        return true;
      })
    );
  }
}
