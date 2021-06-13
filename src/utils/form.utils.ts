import { FormGroup } from '@angular/forms';

type FormValue = never;

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
  const dirty: Partial<FormValue> = {} as never;
  for (const [key, control] of Object.entries(form.controls)) {
    if (control.dirty) {
      if (deep && control instanceof FormGroup && control.controls) {
        dirty[key] = dirtyValues(control);
      } else {
        dirty[key] = control.value as never;
      }
    }
  }
  return dirty;
}
