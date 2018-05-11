import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:
    //To be able to access providers (services included), we use {provide: 'tokenName', useClass: myService}
    //Then in console, do: ng.probe($0).injector.get('tokenName'); shall return myService

    //To be available in Component, must use: constructor(@Inject('SharedService') private sharedService){this.sharedService}
    [
      {
        provide: 'SharedService',
        useClass: SharedService
      },
      //its shortHand:
      /* SharedService */
    ]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav: any;

  constructor() { }

  ngOnInit(): void {

  }

  test = function (value) {
    debugger;
  }

}
