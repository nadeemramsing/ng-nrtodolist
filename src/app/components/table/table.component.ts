import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';

import { MdPaginator, MdSort } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MdPaginator)
  paginator: MdPaginator;
  @ViewChild(MdSort)
  sort: MdSort;

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  data = data;
  dataSource;

  constructor() {



    /* function matchNumber(num, input) {
      var numArray = numToArray(num);
      var inputArray = numToArray(input);

      if (inputArray.length > numArray.length)
        return false;

      var isMatch = false, subArray, position = 0;
      while (true) {
        subArray = numArray.slice(position, inputArray.length + position);
        isMatch = isArrayEqual(inputArray, subArray);

        position++;

        if (isMatch || position === numArray.length - 1) {
          return isMatch;
        }
      }
    }

    function numToArray(num) {
      return num.toString().split("").map(function (n) {
        return parseInt(n);
      })
    }

    function isArrayEqual(arr1, arr2) {
      return JSON.stringify(arr1) === JSON.stringify(arr2)
    }

    console.log(matchNumber(111101808, 1010)); */
  }

  ngOnInit() {
    //place here; ELSE, if in constructor, this.paginator is still undefined (not yet initialized)
    this.dataSource = new ExampleDataSource(this.data, this.paginator, this.sort);
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const data: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

export class ExampleDataSource extends DataSource<any> {

  //args define what to watch; change => connect() reruns.
  constructor(private data, private paginator: MdPaginator, private sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {

    const displayDataChanges = [
      this.data,
      this.paginator.page,
      this.sort.mdSortChange
    ];

    //...: Spread Operator: allows us to expand an expression in places where you would expect multiple arguments (in functions) or multiple elements (in ARRAYS***)
    //Alt. Observable.merge(displayDataChanges[0], displayDataChanges[1])

    //~a way to create an Observable from an existing array?
    const mergeObservable = Observable.merge(...displayDataChanges);
    const ofObservable = Observable.of(this.data); //DOES NOT WORK (unlike merge, it can only accept one args?)

    //map: applying a function to each item (here, we do not actually use item though)
    return mergeObservable.map((item: any) => {
      const data = this.data.slice();

      // Grab the page's slice of data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize).sort(function (a, b) {

        //String
        if (typeof a[item.active] === "string") {
          var x = a[item.active].toLowerCase();
          var y = b[item.active].toLowerCase();

          if (item.direction === "asc")
            return x < y ? -1 : 1;
          else
            return x < y ? 1 : -1;
        }
        else {
          //Number
          return item.direction === "asc" ? a[item.active] - b[item.active] : b[item.active] - a[item.active];

        }
      });
    });
  }

  disconnect() { }
}
