import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { RadioButtonComponent } from './controls/radio-button/radio-button.component';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RadioButtonComponent,
    TextInputComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
