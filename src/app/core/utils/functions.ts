import * as rfdc from 'rfdc';
import { clone } from 'src/utils/model.utils';

export class Functions {
  public static readonly instance = new Functions();

  debug<T>(value: T): void {
    // tslint:disable-next-line: no-console
    console.debug(value);
  }

  clone<T>(source: T): T {
    return clone(source);
  }
}
