import { NgModule } from '@angular/core';

import { MdButtonModule, MdCheckboxModule, MdInputModule, MdListModule, MdIconModule, MdSidenavModule, MdDatepickerModule, MdNativeDateModule, MdTableModule, MdPaginatorModule, MdSortModule } from '@angular/material';

@NgModule({
  //imports used when modules are being used in Components defined in "declarations"
  /* imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdListModule,
    MdIconModule,
    MdSidenavModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule
  ], */
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdListModule,
    MdIconModule,
    MdSidenavModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTableModule,
    MdPaginatorModule,
    MdSortModule
  ]
})
export class MyMaterialsModule { }
