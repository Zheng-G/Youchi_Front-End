import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CarTypeService } from '../../../../../services/carType.service';
import { CarType } from '../../../../../models/carType';

class CapabilityType {
  _id: string;
  capability: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

@Component({
  selector: 'capability-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../brands.scss']
})

export class CapabilityTable {
  @Input() typesData;

  capabilityData: [CapabilityType];

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
      capability: {
        title: '座位数',
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
        if(this.typesData[0].capability) {
          this.capabilityData = this.typesData[0].capability;
          this.source.load(this.capabilityData);
        }
      }
    }
  }

  onCreateConfirm(event):void { 
    //check if name is double
    var nameDouble: any = 0;
    if (this.capabilityData) {
      this.capabilityData.forEach(element => {
        if (element.capability === event.newData.capability) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The capability " + event.newData.chName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        if(this.capabilityData || this.typesData[0]) {
          this.source.getAll().then((data)=>{
            data.push(event.newData);
            this.typesData[0].capability = data;
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
              'color':[],
              'gearshift':[],
              'productCountry':[],
              'fuelOil': [],
              'capability': [event.newData],
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
    var temp = this.capabilityData.filter(function(capability) { return !(capability.capability === event.data.capability); });

    //check if name changed
    var nameDouble: any = 0;
    if (event.data.capability != event.newData.capability) {
      temp.forEach(element => {
        if (element.capability === event.newData.capability) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The capability " + event.newData.capability + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          temp.push(event.newData);
          this.typesData[0].capability = temp;
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
        var temp = this.capabilityData.filter(function(capability) { return !(capability.capability === event.data.capability); });
        this.typesData[0].capability = temp;
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
