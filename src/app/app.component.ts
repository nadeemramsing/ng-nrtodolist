import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //Best to be used with Immutable.js: provides List, Stack, Map, OrderedMap, Set, OrderedSet and Record
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:
    //To be able to access providers (services included), we use {provide: 'tokenName', useClass: myService}
    //Then in console, do: ng.probe($0).injector.get('tokenName'); shall return myService

    //To be available in Component, must use: constructor(@Inject('SharedService') private sharedService){this.sharedService}
    [
      /* {
        provide: 'SharedService',
        useClass: SharedService
      }, */
      //Wrong use of provide and useClass; provide should be a class and useClass should be an alternative class to provide;
      //see: https://stackoverflow.com/questions/47380202/in-which-cases-using-provide-and-useclass-can-be-useful
      
      //its shortHand:
      SharedService
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
