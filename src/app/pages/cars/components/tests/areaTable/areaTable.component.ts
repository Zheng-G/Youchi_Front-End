import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AreaService } from '../../../../../services/area.service';
import { CarType } from '../../../../../models/carType';
import { Area } from '../../../../../models/area';
import { BaThemeSpinner } from '../../../../../theme/services/baThemeSpinner';
@Component({
  selector: 'area-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../tests.scss']
})

export class AreaTable {
  @Input() areasData;

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
      chName: {
          title: '城市名',
          type: 'string'

      },
      chPinyin: {
        title: '拼音',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: AreaService, private spinner: BaThemeSpinner) {
    this.spinner.hide();
  }
    
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['areasData']) {
      if(this.areasData) {
        this.source.load(this.areasData);
      }
    }
  }

  onCreateConfirm(event):void { 
    //check if name is double
    var nameDouble: any = 0;
    if (this.areasData) {
      this.areasData.forEach(element => {
        if (element.chName === event.newData.chName) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The city " + event.newData.chName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        if(this.areasData || this.areasData[0]) {
          this.source.getAll().then((data)=>{

            this.service.createArea(event.newData).then((data) => {
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
        }
        else {
          this.areasData.push({
              'chName' : event.newData.chName,
              'chPinyin' : event.newData.chPinyin
            
            });
          this.service.createArea(event.newData).then((data) => {
            if (data != null) {
              if (data.status === 200) {
                event.confirm.resolve(event.newData);
              }
              else {
                event.confirm.reject();
              }
            }
            else {
              event.confirm.reject();
            }
          })
        }
      } else {
        event.confirm.reject();
      }
    }

  } 

  onSaveConfirm(event):void {
    // array without editing row
   
    var temp = this.areasData.filter(function(area) { return !(area.chName === event.data.chName); });

    //check if name changed
    var nameDouble: any = 0;
    if (event.data.chName != event.newData.chName) {
      temp.forEach(element => {
        if (element.chName === event.newData.chName) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The type " + event.newData.chName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          this.service.updateArea(event.newData).then((data) => {
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
  }

  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteArea(event.data).then((data) => {
        
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
