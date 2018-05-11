import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  /* @ViewChild('task') */ //Will work when two-way binded (using [(ngModel)] or (input)="task = $event.target.value")
  protected task;
  protected list: Observable<Array<any>>;
  protected listLength: number;

  //@Inject(<providerToken>)
  constructor(@Inject('SharedService') private sharedService, private router: Router) {
    this.list = this.sharedService.list;
    this.list.subscribe(res => {
      this.listLength = res.length;

      //init task
      for (var index in res) {
        res[index]['isEdit'] = false;
      }
    });
  }

  public addTask(description): void {
    if (description) {

      var task = {
        description: description
      };
      this.sharedService.addTask(task);
      /* this.task.value = ""; */ //Not binded to view => initialize value directly in view
    }
  }

  public deleteTask(task): void {
    this.sharedService.deleteTask(task);
  }

  public editTask(task): void {
    this.deleteTask(task);
    this.addTask(task.description);
  }

  public openTask(task): void {
    //Communication bet. controllers
    //Method 1: Using SharedService, Subject and Observable 
    this.sharedService.editCurrentTask(task);

    //Method 2: Using queryParams
    this.router.navigate(['home/form'], { queryParams: { isEdit: true } });
  }

  ngOnInit() {

  }
}
