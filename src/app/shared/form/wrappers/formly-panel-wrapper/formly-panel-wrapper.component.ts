import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { ValidationMessageService } from '../../services/validation-message.service';

// tslint:disable: component-selector

@Component({
  selector: 'formly-wrapper-panel',
  template: `
    <div class="field">
      <label class="field-label">{{ to.label }}</label>
      <div class="field-body">
        <ng-container #fieldComponent></ng-container>
      </div>
      <span class="field-helper">{{ to.helper }}</span>
      <div
        class="field-errors"
        *ngIf="validator.errorMessages(field) as messages"
      >
        <span *ngFor="let message of messages">{{ message | async }}</span>
      </div>
    </div>
  `,
})
export class FormlyPanelWrapperComponent extends FieldWrapper {
  constructor(readonly validator: ValidationMessageService) {
    super();
  }
}
