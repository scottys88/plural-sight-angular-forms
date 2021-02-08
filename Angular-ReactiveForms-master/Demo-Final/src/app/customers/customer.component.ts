import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  buildDynamicField(): FormGroup {
    return this.fb.group({
      modificationValue: ''
    })
  }

  get dynamicField(): FormArray {
    return <FormArray>this.customerForm.get('dynamicField');
  }

  addDynamicField(): void {
    this.dynamicField.push(this.buildDynamicField());
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      whatKindOfBusiness: new FormArray([]),
      notification: ['', Validators.required],
      dynamicField: this.fb.array([this.buildDynamicField()])
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => console.log(value)
    );

    this.customerForm.get('whatKindOfBusiness').valueChanges.subscribe(
      value => console.log(value)
    );

    this.customerForm.valueChanges.subscribe(console.log);

  }

  whatKindOfBusinessOptions = [
      { 
        label: "Trade",
        value: 'trade'},
      { 
        label: "Consultant",
        value: 'Consultant'},
      { 
        label: "Medical",
        value: 'Medical'},
  ];

  yesNoOptions = [{
    label: "Yes",
    value: true
  },
  {
    label: "No",
    value: false
  }];


  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setBusinessType(event: any) {
    const checkbox = event.target;
    const businessTypeArray: FormArray = this.customerForm.get('whatKindOfBusiness') as FormArray;

    
    if(checkbox.checked) {
      businessTypeArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;

    businessTypeArray.controls.forEach((ctrl: FormControl) => {
      if(ctrl.value == event.target.value) {
        // Remove the unselected element from the arrayForm
        businessTypeArray.removeAt(i);
        return;
      }
      i++;
    });
    } 
  }


  setNotificationNew(event: boolean):void {
    console.log(event);
  }

}
