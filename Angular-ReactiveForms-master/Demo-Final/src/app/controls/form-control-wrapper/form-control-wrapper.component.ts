import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-control-wrapper',
  templateUrl: './form-control-wrapper.component.html',
  styleUrls: ['./form-control-wrapper.component.css']
})
export class FormControlWrapperComponent implements OnInit {
  @Input()
  label: string;


  constructor() { }

  ngOnInit(): void {
  }

}
