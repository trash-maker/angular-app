import { ActivatedRoute, Event, Router } from '@angular/router';
import { OperatorFunction, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Utility RxJS Operator for getting current `ActivatedRoute` from parent route.
 *
 * Operate on streams of `@angular/router.Event`
 *
 * Return stream of current `ActivatedRoute`
 * @param router the Router from which retrieving the `ActivatedRoute`
 *
 * @returns the RxJS `OperatorFunction`
 */
export function childActivatedRoute(
  router: Router
): OperatorFunction<Event, ActivatedRoute> {
  return pipe(
    map(() => currentActivatedRoute(router)),
    filter((route) => route && route.outlet === 'primary'),
    map((route) => route)
  );
}

/**
 * Utility for getting current `ActivatedRoute` from Router state.
 *
 * Return stream of current `ActivatedRoute`
 * @param router the Router from which retrieving the `ActivatedRoute`
 *
 * @returns the RxJS `ActivatedRoute`
 */
export function currentActivatedRoute(router: Router): ActivatedRoute {
  let route = router.routerState.root;
  while (route.firstChild) {
    route =
      route.children.find((childRoute) => childRoute.outlet === 'primary') ||
      route.firstChild;
  }
  return route;
}
