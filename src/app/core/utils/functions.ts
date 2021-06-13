import { clone } from 'src/utils/model.utils';

export class Functions {
  public static readonly instance = new Functions();

  debug<T>(value: T): void {
    // eslint-disable-next-line no-restricted-syntax
    console.debug(value);
  }

  clone<T>(source: T): T {
    return clone(source);
  }
}
