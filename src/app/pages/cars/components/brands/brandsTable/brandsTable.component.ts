import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LogoEditorComponent } from './logoEditor.component';
import { BrandsService} from '../../../../../services/brands.service';
import { Brand } from '../../../../../models/brand';
import { BaThemeSpinner } from '../../../../../theme/services/baThemeSpinner';
@Component({
  selector: 'brands-table',
  template: `
    <ng2-smart-table class="form-control" [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)" (rowSelect)="onRowSelected($event)"></ng2-smart-table>
    `,
  styleUrls: ['../brands.scss']
})
export class BrandsTable {
  private _brandsData = new BehaviorSubject<Brand[]>([]);

  @Input()
  set brandsData(value) {
    this._brandsData.next(value);
  }

  get brandsData() {
    return this._brandsData.getValue();
  }

  @Output()
  brandSelected = new EventEmitter();

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
            (value) => { return `<img width="auto" height="50px" src="` + value + `" />` },
        filter: false,
        editor: {
          type: 'custom',
          component: LogoEditorComponent,
        },
      },
      chName: {
        title: '中文名',
        type: 'string'
      },
      enName: {
        title: '英文名',
        type: 'string'
      },
      chPinyin: {
        title: '中文拼音',
        type: 'string'
      }

    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: BrandsService, private spinner: BaThemeSpinner) {
      this.spinner.hide();
  }

  ngOnInit() {
    this._brandsData
        .subscribe(x => {
          this.source.load(this.brandsData);
        })
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onCreateConfirm(event):void { 
    console.log(event.newData);
    if (window.confirm('Are you sure you want to save?')) {
      this.service.createBrand(event.newData).then((data) => {
        console.log("response data from server : ", data);
        if (data != null) {
          if (data.status === 200) {
            console.log("brand added to server : ", data);
            event.confirm.resolve(event.newData);
          }
        }
        else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  } 

  onSaveConfirm(event):void {
    if (window.confirm('Are you sure you want to save?')) {
      console.log("new data", event.newData);
      this.service.updateBrand(event.newData).then((data) => {
        console.log("response data from server : ", data);
        if (data != null) {
          if (data.status === 200) {
            console.log("brand updated to server : ", data);
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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteBrand(event.data).then((data) => {
        console.log("response data from server : ", data);
        if (data != null) {
          if (data.status === 200) {
            console.log("brand deleted from server : ", data);
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
    this.brandSelected.emit(event.data);
  }
}
