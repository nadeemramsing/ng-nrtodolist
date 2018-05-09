import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  //Read (SharedService.currentList.subscribe(value => ...))
  //Update (SharedService.changeList(newList))

  private task: Object = {
    title: "",
    description: "",
    date: new Date(),
    isDone: false
  };
  private taskSource = new BehaviorSubject<any>(this.task);
  public readonly currentTask = this.taskSource.asObservable();

  private listArray: Array<Object> = [{
    description: "Rendez-vous"
  },
  {
    description: "Research on Angular4"
  }];
  private listSource = new BehaviorSubject<Array<Object>>(this.listArray); //Initial array
  public readonly list = this.listSource.asObservable();

  constructor() {
    for (var i = 1; i < 21; i++) {
      this.listArray.push({
        title: "title" + i,
        description: "description" + i,
        date: new Date(),
        isDone: false
      });
    }
  }

  private next(message) {
    this.listSource.next(message);
  }

  getListSource(): BehaviorSubject<Array<Object>> {
    return this.listSource;
  }

  addTask(task: Object) {
    this.listArray.push(task);
    this.next(this.listArray);
  }

  deleteTask(task: any) {

    if (JSON.stringify(task.isEdit))
      delete task['isEdit'];

    for (prop in task) {
      var value = task[prop];

      if (value === undefined)
        delete task[prop];
    }

    var t, prop;
    for (var i = 0; i <= this.listArray.length - 1; i++) {
      t = this.listArray[i];

      if (JSON.stringify(t.isEdit))
        delete t['isEdit'];

      if (JSON.stringify(task) === JSON.stringify(t)) {
        this.listArray.splice(i, 1);
      }
    }
    this.next(this.listArray);
  }

  editCurrentTask(task: Object) {
    this.taskSource.next(Object.assign({}, task));
  }

}
