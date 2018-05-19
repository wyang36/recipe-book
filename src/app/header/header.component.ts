import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() headerClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onRouteSelect(route: string) {
    this.headerClick.emit(route);
  }

}
