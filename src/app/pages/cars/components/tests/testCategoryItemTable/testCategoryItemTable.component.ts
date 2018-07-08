import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TestItemService } from '../../../../../services/testItem.service';
import { TestCategory } from '../../../../../models/testCategory';

@Component({
  selector: 'category-item-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../tests.scss']
})

export class TestCategoryItemTable {
  @Input() categoryItems;
  @Input() targetCategory: TestCategory;

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
      testItemName: {
        title: '检测名',
        type: 'string',
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: TestItemService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryItems']) {
      if(this.categoryItems) {
        this.source.load(this.categoryItems);
      }
    }
  }

  onCreateConfirm(event):void { 
    //check if name is double
    var nameDouble: any = 0;
    if (this.categoryItems) {
      this.categoryItems.forEach(element => {
        if (element.testItemName === event.newData.testItemName) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The " + event.newData.testItemName + " test is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          event.newData['checked'] = false;
          data.push(event.newData);
          this.targetCategory["categoryItems"] = data;
          this.service.updateItem(this.targetCategory).then((data) => {
            if (data != null) {
              if (data.status === 200) {
                event.confirm.resolve(event.newData);
              }
            }
            else {
              console.log("response data from server : ", data);
              event.confirm.reject();
            }
          })
        });
      } else {
        event.confirm.reject();
      }
    }
  } 

  onSaveConfirm(event):void {
    // array without editing row
   
    var temp = this.categoryItems.filter(function(item) { return !(item.testItemName === event.data.testItemName); });

    //check if name changed
    var nameDouble: any = 0;
    if (event.data.testItemName != event.newData.testItemName) {
      temp.forEach(element => {
        if (element.testItemName === event.newData.testItemName) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The " + event.newData.testItemName + " item is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          event.newData['checked'] = false;
          temp.push(event.newData);
          this.targetCategory["categoryItems"] = temp;
          this.service.updateItem(this.targetCategory).then((data) => {
            if (data != null) {
              if (data.status === 200) {
                event.confirm.resolve(event.newData);
              }
            }
            else {
              console.log("response data from server : ", data);
              event.confirm.reject();
            }
          })
        });
      } else {
        event.confirm.reject();
      }
    }
  }

  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      var temp = this.targetCategory["categoryItems"].filter(function(item) { return !(item.testItemName === event.data.testItemName); });
      this.targetCategory["categoryItems"] = temp as [any];
      this.service.updateItem(this.targetCategory).then((data) => {
        if (data != null) {
          if (data.status === 200) {
            event.confirm.resolve(event.newData);
          }
        }
        else {
          event.confirm.reject();
        }
      })
    } else {
      event.confirm.reject();
    }
  }
}
