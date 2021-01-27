import * as rfdc from 'rfdc';
import { clone } from 'src/utils/model.utils';

export class Functions {
  public static readonly instance = new Functions();

  clone<T>(source: T): T {
    return clone(source);
  }
}
