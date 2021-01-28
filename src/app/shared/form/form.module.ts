import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FieldValidatorFn } from '@ngx-formly/core/lib/services/formly.config';
import { FormlyFieldInputComponent } from './fields/formly-field-input/formly-field-input.component';
import { ValidationMessageService } from './services/validation-message.service';
import { FormlyPanelWrapperComponent } from './wrappers/formly-panel-wrapper/formly-panel-wrapper.component';

function wrap(name: string, validator: FieldValidatorFn): FieldValidatorFn {
  return (c: AbstractControl, field: FormlyFieldConfig, options) => {
    const errors = validator(c, field, options);
    return errors && { [name]: errors };
  };
}

@NgModule({
  declarations: [FormlyPanelWrapperComponent, FormlyFieldInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'numeric',
          validation: wrap('numeric', Validators.pattern('[0-9]*')),
        },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        {
          name: 'minlength',
          message: (error) => `At least ${error.requiredLength} chars!`,
        },
        { name: 'pattern', message: 'Bad format' },
        { name: 'numeric', message: 'This field is numeric!' },
      ],
      wrappers: [{ name: 'panel', component: FormlyPanelWrapperComponent }],
      types: [
        {
          name: 'input',
          component: FormlyFieldInputComponent,
          wrappers: ['panel'],
        },
      ],
    }),
  ],
  providers: [ValidationMessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FormlyModule, ReactiveFormsModule],
})
export class FormModule {}
