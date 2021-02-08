
import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup,FormControl, Validator, Validators,AbstractControl, ValidationErrors } from "@angular/forms";


@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  controlName: string;

  @Input()
  options: any;

  @Output()
  select: EventEmitter<Boolean> = new EventEmitter<boolean>();

  onSelect(event: boolean) {
    console.log(event);
    this.select.emit(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
