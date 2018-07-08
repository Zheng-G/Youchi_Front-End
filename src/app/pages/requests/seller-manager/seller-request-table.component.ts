import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SellerRequestService } from '../../../services/sellerRequest.service';
import { SellerRequest } from '../../../models/sellerRequest';

@Component({
  selector: 'seller-request-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../requests.scss']
})

export class SellerRequestTable {
  @Input() requestsData;

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
      userPhone: {
        title: '卖家电话号码',
        type: 'html',
        valuePrepareFunction: 
            (value) => { return `<a href="#/pages/cars/user-manager;userPhone=` + value  + `" title="看用户详情">` + value + `</a>` },
      },
      sellcarBrand: {
        title: '品牌',
        type: 'string'
      },
      sellcarSeries: {
        title: '车系',
        type: 'string'
      },
      purchaseDate: {
        title: '上牌时间',
        type: 'string'
      },
      marketingStartDate: {
        title: '上架时间',
        type: 'string'
      },
      totalDriven: {
        title: '行驶里程',
        type: 'string'
      },
      currentCarPlace: {
        title: '验车地址',
        type: 'string'
      },
      requestTime: {
        title: '登录时间',
        type: 'string'
      },
      requestStatus: {
        title: '请求处理',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '没完', title: '没完' },
              { value: '完了', title: '完了' },
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '没完', title: '没完' },
              { value: '完了', title: '完了' },
            ],
          },
        },
      }      
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SellerRequestService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['requestsData']) {
      console.log("series data changed ：", this.requestsData);
      if (this.requestsData && this.requestsData.length !== 0) {
          this.source.load(this.requestsData);
      }
    }
  }

  onCreateConfirm(event):void { 
    console.log(event.newData);
    if (window.confirm('Are you sure you want to save?')) {
      this.service.createRequest(event.newData).then((data) => {
        console.log("response data from server : ", data);
        if (data != null) {
          if (data.status === 200) {
            console.log("request added to server : ", data);
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
      this.service.updateRequest(event.newData).then((data) => {
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
      this.service.deleteRequest(event.data).then((data) => {
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
}
