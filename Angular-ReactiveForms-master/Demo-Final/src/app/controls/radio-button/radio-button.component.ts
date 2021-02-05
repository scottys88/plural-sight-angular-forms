
import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor,FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {

  public radioButtonOptions: FormGroup = new FormGroup({
    radio: new FormControl(true, [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
    this.radioButtonOptions.valueChanges.subscribe(
      data => console.log(data)
    )
  }

}
