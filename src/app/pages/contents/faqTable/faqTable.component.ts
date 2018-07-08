import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FAQService } from '../../../services/faq.service';
import { CarType } from '../../../models/carType';
import { Area } from '../../../models/area';

@Component({
  selector: 'faq-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)" ></ng2-smart-table>
    `,
  styleUrls: ['../contents.scss']
})

export class FAQTable {
  @Input() faqsData;

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
      chQuestion: {
        title: '问题',
        type: 'string'

      },
      chAnswer: {
        title: '回答',
        type: 'textarea',
        editor: {
          type: 'textarea',
        },
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: FAQService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['faqsData']) {
      if(this.faqsData) {
        this.source.load(this.faqsData);
      }
    }
  }

  onCreateConfirm(event):void { 
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{

          this.service.createFAQ(event.newData).then((data) => {
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

  onSaveConfirm(event):void {
    if (window.confirm('Are you sure you want to save?')) {
      this.source.getAll().then((data)=>{
        this.service.updateFAQ(event.newData).then((data) => {
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
      this.service.deleteFAQ(event.data).then((data) => {
        
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
