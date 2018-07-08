import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TestItemService } from '../../../../../services/testItem.service';

@Component({
  selector: 'test-category-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)" (rowSelect)="onRowSelected($event)"></ng2-smart-table>
    `,
  styleUrls: ['../tests.scss']
})

export class TestCategoryTable {
  @Input() testCategories;

  @Output()
  categorySelected = new EventEmitter();

  settings = {
    pager: {
      perPage: 10
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      testCategory: {
        title: '检测类别',
        type: 'string',
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: TestItemService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['testCategories']) {
      if(this.testCategories) {
        this.source.load(this.testCategories);
      }
    }
  }

  onCreateConfirm(event):void { 
    if (window.confirm('Are you sure you want to save?')) {
      this.source.getAll().then((data)=>{
        console.log("create item data : ", event.newData);
        this.service.createItem(event.newData).then((data) => {
          if (data != null) {
            if (data.status === 200) {
              event.newData = JSON.parse(data._body)[0];
              event.confirm.resolve(event.newData);
            }
          }
          else {
            event.confirm.reject();
          }
        });
      });
    } else {
      event.confirm.reject();
    }
  } 

  onSaveConfirm(event):void {
    // array without editing row
   
    if (window.confirm('Are you sure you want to save?')) {
      this.source.getAll().then((data)=>{
        this.service.updateItem(event.newData).then((data) => {
          if (data != null) {
            if (data.status === 200) {
              event.confirm.resolve(event.newData);
            }
          }
          else {
            event.confirm.reject();
          }
        });
      });
    } else {
      event.confirm.reject();
    }
  }

  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteItem(event.data).then((data) => {
        
        if (data != null) {
          if (data.status === 200) {
            
            event.confirm.resolve(event.newData);
          }
        }
        else {
          event.confirm.reject();
        }
      })
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onRowSelected(event) {
    console.log("selected row data ：", event);
    this.categorySelected.emit(event.data);
  }
}
