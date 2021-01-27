import * as rfdc from 'rfdc';

export function clone<T>(source: T): T {
  return rfdc()(source);
}
