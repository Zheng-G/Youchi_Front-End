import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BuyerRequestService } from '../../../services/buyerRequest.service';
import { BuyerRequest } from '../../../models/buyerRequest';

@Component({
  selector: 'buyer-request-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../requests.scss']
})

export class BuyerRequestTable {
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
        title: '买家电话号码',
        type: 'string'
      },
      sellcarUDID: {
        title: '想买的车源号',
        type: 'html',
        valuePrepareFunction: 
            (value) => { return `<a href="#/pages/cars/sell-car-manager;sellcarUDID=` + value + `" title="看车详情">` + value + `</a>` },
      },
      requestType: {
        title: '请求流型',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '降价通知', title: '降价通知' },
              { value: '看车预约', title: '看车预约' }
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '降价通知', title: '降价通知' },
              { value: '看车预约', title: '看车预约' }
            ],
          },
        },
      },
      requestTime: {
        title: '登录时间',
        type: 'string'
      },
      price: {
        title: '原价   /   打印',
        type: 'string',
        
      },
      requestStatus: {
        title: '请求处理',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '完了', title: '完了' },
              { value: '没完', title: '没完' }
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '完了', title: '完了' },
              { value: '没完', title: '没完' }
            ],
          },
        },
      } 
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: BuyerRequestService) {
  }

  ngOnInit() {
    setTimeout(function(){ 
      $('.ng2-smart-th.price input-filter input').prop('disabled', true);
      $('.ng2-smart-th.requestType select-filter select').on('change', function(){
        if($(this).val() == '降价通知') {
          $('.ng2-smart-th.price input-filter input').prop('disabled', false);
        } else {
          $('.ng2-smart-th.price input-filter input').prop('disabled', true);
        }
      });
    }, 100);
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
