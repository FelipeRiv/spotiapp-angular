import { Component, OnInit } from '@angular/core';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  icon = faMusic;

  constructor() { }

  ngOnInit(): void {
  }

}
