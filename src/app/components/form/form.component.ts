import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

import { SharedService } from './../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  @ViewChild('form')
  private formRef: ElementRef;
  protected formGroup: FormGroup;

  protected task: any = {};

  protected title: String;
  protected description: String;
  protected isDone: Boolean;
  protected date: Date;

  protected isEdit: Boolean;
  private clone: any;

  /* Subscriptions */
  private activatedRouteSub;
  private currentTaskSub;
  private titleSub;
  private descriptionSub;
  private dateSub;
  private isDoneSub;

  constructor(private sharedService: SharedService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      title: '',
      description: '',
      date: '',
      isDone: ''
    });
  }

  //View -> Controller (Method 2)
  public passDate(date) {
    /* this.date = date; */
  }

  public addTask() {

  }

  public editTask() {
    var task = {
      title: this.title,
      description: this.description,
      date: this.date,
      isDone: this.isDone
    }
    this.sharedService.deleteTask(this.clone);
    this.sharedService.addTask(task);
    this.sharedService.editCurrentTask(task);

    //Redirect to table route
    this.router.navigate(['home/details']);
  }

  ngOnInit(): void {
    this.activatedRouteSub = this.activatedRoute.queryParams.subscribe(params => {
      this.isEdit = params.isEdit ? JSON.parse(params.isEdit) : false;
    });

    this.currentTaskSub = this.sharedService.currentTask.subscribe(res => {
      this.title = res.title;
      this.description = res.description;
      this.date = res.date;
      this.isDone = res.isDone;

      //cloning task for deletion
      this.clone = new Object({
        title: res.title,
        description: res.description,
        date: res.date,
        isDone: res.isDone
      });

      //Using SharedService, Observable and Subject
      /* this.title = res.title;
      this.description = res.description;
      this.date = res.date;
      this.isDone = res.isDone; */

      //~formGroup
      this.formGroup.patchValue(this.clone);

      //setValue => MUST include all values/fields
      //GETTING ERROR
      /* this.formGroup.setValue({
        title: res.title,
        description: res.description,
        date: res.date,
        isDone: res.isDone
      }); */

      //Using queryParams
      /* this.activatedRoute.queryParams.subscribe(params => {
        var task = JSON.parse(params.task);

        this.title = task.title;
        this.description = task.description;
        this.date = task.date;
        this.isDone = task.isDone;
      }); */

      //Using routeParams (not implemented)
      /* this.activatedRoute.params.subscribe(task => console.log(task)); */
    });


    //View -> Controller (Method 1)
    //It's like watching formGroup
    this.titleSub = this.formGroup.get('title').valueChanges.subscribe(newTitle => { this.title = newTitle });
    this.descriptionSub = this.formGroup.get('description').valueChanges.subscribe(newDesc => { this.description = newDesc });
    this.dateSub = this.formGroup.get('date').valueChanges.subscribe(newDate => { this.date = newDate });
    this.isDoneSub = this.formGroup.get('isDone').valueChanges.subscribe(newValue => { this.isDone = newValue });
  }

  /* ngOnDestroy(): Cleanup just before Angular destroys the directive/component. Unsubscribe observables and detach event handlers avoid memory leaks. */
  ngOnDestroy(): void {
    this.activatedRouteSub.unsubscribe();
    this.currentTaskSub.unsubscribe();
    this.titleSub.unsubscribe();
    this.descriptionSub.unsubscribe();
    this.dateSub.unsubscribe();
    this.isDoneSub.unsubscribe();
  }

}
