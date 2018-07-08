import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TypeLogoEditorComponent } from './typeLogoEditor.component';
import { CarTypeService } from '../../../../../services/carType.service';
import { CarType } from '../../../../../models/carType';

class CarDetailType {
  _id: string;
  logo: string;
  chName: string;
  chPinyin: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

@Component({
  selector: 'type-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../brands.scss']
})

export class TypeTable {
  @Input() typesData;

  typeData: [CarDetailType];

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
      logo: {
        title: '商标',
        type: 'html',
        valuePrepareFunction: 
            (value) => { return `<img width="60px" height="auto" src="` + value + `" />` },
        filter: false,
        editor: {
          type: 'custom',
          component: TypeLogoEditorComponent,
        },

      },
      chName: {
        title: '中文名',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: CarTypeService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['typesData']) {
      console.log("series data changed ：", this.typesData);
      if (this.typesData && this.typesData[0]) {
        if(this.typesData[0].type) {
          this.typeData = this.typesData[0].type;
          this.source.load(this.typeData);
        }
      }
    }
  }

  onCreateConfirm(event):void { 
    //check if name is double
    var nameDouble: any = 0;
    if (this.typeData) {
      this.typeData.forEach(element => {
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
        if(this.typeData || this.typesData[0]) {
          this.source.getAll().then((data)=>{
            data.push(event.newData);
            this.typesData[0].type = data;
            this.service.updateCarType(this.typesData[0]).then((data) => {
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
          this.typesData.push({
              'type':[event.newData],
              'color':[],
              'gearshift':[],
              'productCountry':[],
              'fuelOil': [],
              'capability': [],
              'emission':[],
            });
          this.service.createCarType(this.typesData).then((data) => {
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
    var temp = this.typeData.filter(function(type) { return !(type.chName === event.data.chName); });

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
          temp.push(event.newData);
          this.typesData[0].type = temp;
          this.service.updateCarType(this.typesData[0]).then((data) => {
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
      this.source.getAll().then((data)=>{
        // array without deletiing row
        var temp = this.typeData.filter(function(type) { return !(type.chName === event.data.chName); });
        this.typesData[0].type = temp;
        this.service.updateCarType(this.typesData[0]).then((data) => {
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
