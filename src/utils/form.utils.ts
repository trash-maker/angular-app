import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: no-any
type FormValue = any;

/**
 * Gets only changed field values (dirty values) from given form
 *
 * @see https://stackoverflow.com/questions/53613803/angular-reactive-forms-how-to-get-just-changed-values
 *
 * @param deep enable retrieve of dirty values for nested forms
 * @param form
 * @returns the dirty values
 */
export function dirtyValues(form: FormGroup, deep = true): Partial<FormValue> {
  const dirty: Partial<FormValue> = {};
  for (const [key, control] of Object.entries(form.controls)) {
    if (control.dirty) {
      if (deep && control instanceof FormGroup && control.controls) {
        dirty[key] = dirtyValues(control);
      } else {
        dirty[key] = control.value;
      }
    }
  }
  return dirty;
}
