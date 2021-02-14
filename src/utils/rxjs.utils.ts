import {
  merge,
  NEVER,
  Observable,
  of,
  OperatorFunction,
  pipe,
  range,
  throwError,
  timer,
  zip,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  map,
  mergeMap,
  retryWhen,
  scan,
  switchMapTo,
  tap,
} from 'rxjs/operators';

/**
 * Utility RxJS Operator for handling errors on given `Observable`.
 *
 * Operate on streams of any type `T`
 *
 * Return the same stream of `T` handling specified errors.
 *
 * @param predicate predicate used to specify the errors to handle, or 'any' to handle any error.
 * @param fallbackValue the fallback value to emit on the stram for the given `erroCode`
 *
 * @returns the RxJS `OperatorFunction`
 */
export function handleError<T, E>(
  predicate: (err: E) => boolean | 'any',
  fallbackValue: T
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return source.pipe(
      catchError((err) => {
        if (predicate(err)) {
          return of(fallbackValue);
        }
        return throwError(err);
      })
    );
  };
}

/**
 * Rxjs pipe operator utility inspired by [angular.io](angular.io)
 * Provide a configurable typeahead behavior.
 *
 * @param config optional configuration for  `debounce` time and  `minLength`
 */
export function typeahead(config?: {
  debounce?: number;
  minLength?: number;
}): OperatorFunction<string, string> {
  config = config || {};
  const debounce = config.debounce || 10;
  const minLength = config.minLength || 2;
  return pipe(
    filter((text) => text.length > minLength),
    debounceTime(debounce),
    distinctUntilChanged()
  );
}

/**
 * Rxjs pipe operator utility inspired by [angular.io](angular.io)
 * Provide an exponential baackoff behavior.
 *
 * @param maxTries maximum number of attempts
 * @param delay step amount for the backoff
 */
export function backoff<T>(
  maxTries: number,
  delay: number
): OperatorFunction<T, T> {
  return pipe(
    retryWhen((attempts) =>
      zip(range(1, maxTries + 1), attempts).pipe(
        mergeMap(([i, err]) => (i > maxTries ? throwError(err) : of(i))),
        map((i) => i * i),
        mergeMap((v) => timer(v * delay))
      )
    )
  );
}

/**
 * Rxjs pipe operator utility inspired by
 * [this medium article](https://medium.com/javascript-everyday/http-requests-polling-like-a-hero-with-rxjs-474a2e1fa057)
 * Provide a polling behavior.
 *
 * @param pollInterval the polling interval
 * @param trigger$ (optional) trigger source for forcing fetch
 */
export function polling<T, I>(
  pollInterval: number,
  trigger$?: Observable<I>
): OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    merge(trigger$ || NEVER, timer(0, pollInterval)).pipe(switchMapTo(source$));
}

/**
 * Rxjs pipe operator utility inspired by
 * [this medium article](https://medium.com/javascript-everyday/http-requests-polling-like-a-hero-with-rxjs-474a2e1fa057)
 * Provide a poll-until behavior.
 *
 * @param pollInterval the polling interval
 * @param maxAttempts number of allowed failures
 * @param responsePredicate response predicate for stopping polling
 */
export function pollUntil<T>(
  pollInterval: number,
  maxAttempts: number,
  responsePredicate: (res: T) => boolean
): OperatorFunction<T, T> {
  const checkAttempts = (max: number) => {
    return (attempts: number) => {
      if (attempts > max) {
        throw new Error('Error: max attempts');
      }
    };
  };
  return (source$: Observable<T>) =>
    timer(0, pollInterval).pipe(
      scan((attempts) => ++attempts, 0),
      tap(checkAttempts(maxAttempts)),
      switchMapTo(source$),
      first(responsePredicate)
    );
}
