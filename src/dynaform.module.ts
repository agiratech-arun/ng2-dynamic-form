import { NgModule, ModuleWithProviders }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { DynaFormComponent } from './controls-components/dynamic-form-component';
import { TextControl } from './controls-components/text-control';
import { NumberControl } from './controls-components/number-control';
import { CheckBoxControl } from './controls-components/checkbox-control';
import { RadioControl } from './controls-components/radio-control';
import { DynaValidationBlock } from './controls-components/validation-messages-block';

@NgModule({
  imports:      [ BrowserModule,  FormsModule, ReactiveFormsModule],
  declarations: [ DynaFormComponent, TextControl, NumberControl, CheckBoxControl, RadioControl, DynaValidationBlock ],
  exports: [ DynaFormComponent, TextControl, NumberControl, CheckBoxControl, RadioControl, DynaValidationBlock ],
})
export class DynaFormModule {
  static forRoot(): ModuleWithProviders { return {ngModule: DynaFormModule, providers: []}; }
}