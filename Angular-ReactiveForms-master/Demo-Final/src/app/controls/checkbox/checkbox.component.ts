import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input()
  parent: FormGroup;

  @Input()
  controlName: string;

  @Input()
  options: any;

  @Output()
  select: EventEmitter<Boolean> = new EventEmitter<boolean>();

  onSelect(event: boolean) {
    this.select.emit(event);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
