import { Component, OnInit } from '@angular/core';

import {EventsService} from '../events.service';

import * as Class from '../../classes/events';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  events: any [];
  activeEventID: number = null;
  showForm = false;
  sortedBy: string;
  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.getData();
  }

  sortBy(e, option) {
    if (e) {
      e.target.parentElement.querySelectorAll('button').forEach(item => item.classList.remove('active'));
      e.target.classList.add('active');
    }
    function compare(a, b) {
      if (a[option] < b[option]) {
        return -1;
      }
      if (a[option] > b[option]) {
        return 1;
      }
      return 0;
    }
    this.events.sort(compare);
    this.sortedBy = option;
  }

  getData() {
    this.eventsService.getEvents()
      .subscribe(
        events => {
          this.events = [];
          let thing: any;
          for (const event of events) {
            switch (event.type) {
              case 'transaction':
                thing = new Class.Transaction(event);
                break;
              case 'article':
                thing = new Class.Article(event);
            }
            this.events.push(thing);
          }
          if (!this.sortedBy) {
            this.events.reverse();
          } else {
            this.sortBy(null, this.sortedBy);
          }
        }
      );
    this.activeEventID = null;
  }

  setActive(id: number) {
    this.activeEventID = id;
  }

  onEventDelete(id) {
    this.eventsService
      .deleteEvent(id)
      .subscribe(
        () => {
          this.getData();
        },
        error => console.log(error, 'error')
      );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addEvent(data) {
    this.eventsService.postEvent(data).subscribe(
      () => {
        this.getData();
      },
      error => console.log(error, 'error')
    );
    this.showForm = false;
  }

  onReadEvent(data) {
    this.eventsService.updateEvent(data).subscribe(
      () => this.getData(),
      error => console.log(error)
    );
  }
}
