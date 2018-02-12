import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() eventData: any;
  @Input() active = false;
  @Output() SetActive =  new EventEmitter<number>();
  @Output() EventDelete = new EventEmitter<any>();
  @Output() ReadEvent = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  setActive(e, id: number) {
    if (this.active) {
      this.SetActive.emit(null);
    } else {
      this.SetActive.emit(id);
    }
  }
  deleteEvent(id) {
    this.EventDelete.emit(id);
  }
  readEvent(item) {
    item.isRead = true;
    this.ReadEvent.emit(item);
  }
}
