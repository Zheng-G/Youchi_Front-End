import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LocalDataSource } from 'ng2-smart-table';

import { SeriesLogoEditorComponent } from './seriesLogoEditor.component';
import { Brand } from '../../../../../models/brand';
import { Series } from '../../../../../models/series';
import { BrandsService} from '../../../../../services/brands.service';

@Component({
  selector: 'series-table',
  templateUrl: './seriesTable.html',
  styleUrls: ['../brands.scss']
})
export class SeriesTable {

  @Input() seriesData: [Series];
  @Input() targetBrand: Brand;

  settings = {
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
      seriesLogo: {
        title: '商标',
        type: 'html',
        valuePrepareFunction: 
            (value) => { return `<img width="auto" height="50px" src="` + value + `" />` },
        filter: false,
        editor: {
          type: 'custom',
          component: SeriesLogoEditorComponent,
        },
      },
      chName: {
        title: '中文名',
        type: 'string'
      },
      chPinyin: {
        title: '中文拼音',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: BrandsService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['seriesData']) {
      console.log("series data changed ：", this.seriesData);
      if (this.seriesData)
        this.source.load(this.seriesData)
    }
  }

  onCreateConfirm(event):void { 
    //check if name is double
    var nameDouble: any = 0;
    if (this.targetBrand["series"]) {
      this.targetBrand["series"].forEach(element => {
        if (element.chName === event.newData.chName) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The series " + event.newData.chName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          data.push(event.newData);
          this.targetBrand["series"] = data;
          this.service.updateBrand(this.targetBrand).then((data) => {
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
    var temp = this.targetBrand["series"].filter(function(series) { return !(series.chName === event.data.chName); });

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
      window.alert("The series " + event.newData.chName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          temp.push(event.newData);
          this.targetBrand["series"] = temp as [Series];
          this.service.updateBrand(this.targetBrand).then((data) => {
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
      var temp = this.targetBrand["series"].filter(function(series) { return !(series.chName === event.data.chName); });
      this.targetBrand["series"] = temp as [Series];
      this.service.updateBrand(this.targetBrand).then((data) => {
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
