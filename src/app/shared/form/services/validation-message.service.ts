import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { isObservable, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ValidationMessageService {
  constructor(private config: FormlyConfig) {}

  errorMessages(field: FormlyFieldConfig): Observable<string>[] | undefined {
    if (field && field.formControl) {
      const fieldForm: AbstractControl = field.formControl;
      const messages: Observable<string>[] = [];
      for (const error in fieldForm.errors) {
        // eslint-disable-next-line no-prototype-builtins
        if (fieldForm.errors.hasOwnProperty(error)) {
          let message = this.config.getValidatorMessage(error);

          if (
            fieldForm.errors[error] !== null &&
            typeof fieldForm.errors[error] === 'object'
          ) {
            if (fieldForm.errors[error].errorPath) {
              continue;
            }

            if (fieldForm.errors[error].message) {
              message = fieldForm.errors[error].message;
            }
          }

          if (
            field.validation &&
            field.validation.messages &&
            field.validation.messages[error]
          ) {
            message = field.validation.messages[error];
          }

          if (
            field.validators &&
            field.validators[error] &&
            field.validators[error].message
          ) {
            message = field.validators[error].message;
          }

          if (
            field.asyncValidators &&
            field.asyncValidators[error] &&
            field.asyncValidators[error].message
          ) {
            message = field.asyncValidators[error].message;
          }

          let displayMessage: string | Observable<string>;
          if (typeof message === 'function') {
            displayMessage = message(fieldForm.errors[error], field);
          } else {
            displayMessage = message;
          }
          if (displayMessage !== null && displayMessage !== undefined) {
            messages.push(
              !isObservable(displayMessage)
                ? of(displayMessage)
                : displayMessage
            );
          }
        }
      }
      return messages;
    }
    return undefined;
  }
}
