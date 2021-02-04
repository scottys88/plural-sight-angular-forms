import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from './customer';

import { debounceTime } from 'rxjs/operators';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    console.log(c);
    if (c.value !== null && (isNaN(c.value)) || c.value < min || c.value > max) {
      return { range: true };
    }
    return null;
  };
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address'
  }

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  constructor(private fb: FormBuilder) { }

  
  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['',
        [
          Validators.required,
          Validators.minLength(3)]
        ],
      lastName: ['',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
      }, { validator: emailMatcher }),
      phone: '',
      rating: [null, ratingRange(1, 5)],
      notification: 'email',
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
    });


    this.customerForm.get('notification').valueChanges.subscribe(value => {
      this.setNotification(value);
    })

    const emailControl = this.customerForm.get('emailGroup.email');
    
    emailControl.valueChanges.pipe(
      debounceTime(1000)).subscribe
      (value => {
      this.setMessage(emailControl);
    })
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if((c.touched || c.dirty) && c.errors) {
      console.log(c.errors);
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');

    if (notifyVia === 'text') {
      phoneControl.clearValidators();
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Scott',
      lastName: 'Schubert',
      sendCatalog: false
    });
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

}
