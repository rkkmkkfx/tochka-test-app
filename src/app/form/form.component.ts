import { Output, Component, OnInit, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';

import * as Class from '../../classes/events';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  newEvent: any = new Class.Transaction({});
  isTransaction = true;
  @Output() createEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}
  setNewEventType(Type) {
    this.newEvent = new Class[Type]({});
    this.isTransaction = this.newEvent instanceof Class.Transaction;
  }
  formSubmit(form: NgForm) {
    for (const prop in form.value) {
      if (this.newEvent.hasOwnProperty(prop)) {
        this.newEvent[prop] = form.value[prop];
      }
    }
    this.createEvent.emit(this.newEvent);
    form.resetForm();
  }
}
