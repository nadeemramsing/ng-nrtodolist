import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';

import { MdPaginator, MdSort } from '@angular/material';

import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @ViewChild(MdPaginator)
  paginator: MdPaginator;
  
  @ViewChild(MdSort)
  sort: MdSort;

  displayedColumns = ['title', 'description', 'date', 'isDone'];
  data;
  length;
  dataSource;

  constructor(private sharedService: SharedService) {
    this.data = sharedService.getListSource();

    sharedService.list.subscribe(res => { this.length = res.length });
  }

  ngOnInit() {
    this.dataSource = new _DataSource(this.data, this.paginator, this.sort);
  }
}

export class _DataSource extends DataSource<any> {

  constructor(private data, private paginator: MdPaginator, private sort: MdSort) {
    super();
  }

  connect(): Observable<any> {
    const dataChanges = [this.data, this.paginator.page, this.sort.mdSortChange];

    return Observable.merge(...dataChanges).map((item: any) => {
      const clone = this.data.value.slice();

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return clone.splice(startIndex, this.paginator.pageSize).sort(function (a, b) {
        if (typeof a[item.active] === "string") {
          var x = a[item.active].toLowerCase();
          var y = b[item.active].toLowerCase();

          if (item.direction === "asc")
            return x < y ? -1 : 1;
          else
            return x < y ? 1 : -1;
        };
      });
    });
  }
  disconnect(): void { }
}
