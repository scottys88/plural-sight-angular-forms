import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  controlName: string;

  get invalid() {
    return (
      this.parent.get(this.controlName).hasError('required') &&
      this.parent.get(this.controlName).touched ||
      this.parent.get(this.controlName).hasError('minlength') &&
      this.parent.get(this.controlName).touched
    );
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.controlName);
  }

}
