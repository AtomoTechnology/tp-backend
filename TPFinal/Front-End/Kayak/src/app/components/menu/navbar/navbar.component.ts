import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  visible: boolean = true;
  @Output() menu: EventEmitter<any> = new EventEmitter();
  @Output() Logout: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  LogoutEmitter(){
    this.Logout.emit(true);
  }

}
