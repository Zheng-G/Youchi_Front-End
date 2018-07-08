import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CarTypeService } from '../../../../../services/carType.service';
import { CarType } from '../../../../../models/carType';

class ColorType {
  _id: string;
  colorName: string;
  colorRGB: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

@Component({
  selector: 'color-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../brands.scss']
})

export class ColorTable {
  @Input() typesData;

  colorData: [ColorType];

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
      colorName: {
        title: '车颜色',
        type: 'string'
      },
      colorRGB: {
        title: 'RGB颜色值',
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
        if(this.typesData[0].color) {
          this.colorData = this.typesData[0].color;
          this.source.load(this.colorData);
        }
      }
    }
  }

  onCreateConfirm(event):void { 
    //check if name is double
    var nameDouble: any = 0;
    if (this.colorData) {
      this.colorData.forEach(element => {
        if (element.colorName === event.newData.colorName) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The color " + event.newData.chName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        if(this.colorData || this.typesData[0]) {
          this.source.getAll().then((data)=>{
            data.push(event.newData);
            this.typesData[0].color = data;
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
              'type':[],
              'color':[event.newData],
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
    var temp = this.colorData.filter(function(type) { return !(type.colorName === event.data.colorName); });

    //check if name changed
    var nameDouble: any = 0;
    if (event.data.colorName != event.newData.colorName) {
      temp.forEach(element => {
        if (element.colorName === event.newData.colorName) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The color " + event.newData.colorName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          temp.push(event.newData);
          this.typesData[0].color = temp;
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
        var temp = this.colorData.filter(function(color) { return !(color.colorName === event.data.colorName); });
        this.typesData[0].color = temp;
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
