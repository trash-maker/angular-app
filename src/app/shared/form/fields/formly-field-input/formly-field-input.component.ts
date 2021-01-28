import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { ValidationMessageService } from '../../services/validation-message.service';

// tslint:disable: component-selector

@Component({
  selector: 'formly-field-input',
  template: `
    <input
      type="input"
      [placeholder]="to.placeholder"
      [formControl]="control"
      [formlyAttributes]="field"
    />
  `,
})
export class FormlyFieldInputComponent extends FieldType {
  get control(): FormControl {
    return this.formControl as FormControl;
  }

  constructor(readonly validator: ValidationMessageService) {
    super();
  }
}
