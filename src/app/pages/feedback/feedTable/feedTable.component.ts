import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FEEDService } from '../../../services/feed.service';
@Component({
  selector: 'feed-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)"  >
    </ng2-smart-table>`,
  styleUrls: ['../feedback.scss']
})

export class FEEDTable {
  @Input() feedsData;
  // actions = {
  //   edit:false
  // };
  settings = {
    actions:{edit:false,
      add:false
    },
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
      phoneNumber: {
        title: '電話號碼',
        type: 'string'

      },
      date: {
        title: '日期',
        type: 'textarea',
        editor: {
          type: 'textarea',
        },

      },
      feedback: {
        title: '意见反馈',
        type: 'textarea',
        editor: {
          type: 'textarea',
        },
        
      } 
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: FEEDService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['feedsData']) {
      if(this.feedsData) {
        this.source.load(this.feedsData);
      }
    }
  }
  onSaveConfirm(event): void {}
  onCreateConfirm(event): void {}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteFEED(event.data).then((data) => {
        
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
}
