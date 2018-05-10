import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: any;
  
  constructor() {}
  
  ngOnInit(): void {
    
  }

  test = function(value) {
    debugger; 
  }

}
