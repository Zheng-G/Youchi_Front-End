import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from '../../../../../services/user.service';
import { SellCarService } from '../../../../../services/sellCar.service';
import { CarType } from '../../../../../models/carType';
import { Area } from '../../../../../models/area';
import { Car } from '../../../../../models/car';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoModal } from '../../../../../modals/car-info-modal/car-info-modal.component';
import { CarTestModal } from '../../../../../modals/car-test-modal/car-test-modal.component';
import { BaThemeSpinner } from '../../../../../theme/services/baThemeSpinner';
@Component({
  selector: 'button-view1',
  template: `
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-info" (click)="onClick()">编辑详情</button>
          <button type="button" class="btn btn-success" (click)="onTestClick()">验车结课</button>
          <button type="button" class="btn btn-danger" (click)="onDelete()">删除</button>
        </div>
  `,
})
export class BtnViewComponent implements ViewCell, OnInit {
  
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  brandsData: any;
  carTypes: any;
  areasData: any;

  constructor(private modalService: NgbModal, private apiService: SellCarService ) {
  }

  ngOnInit() {
    // this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    // show car add modal
    console.log("this user data : ", this.value);
    const activeModal = this.modalService.open(CarInfoModal, {size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.mode = 'edit';
    activeModal.componentInstance.modalHeader = '详情';
    activeModal.componentInstance.userData = this.value;
    activeModal.componentInstance.selectedBrand = this.value['brand'];
    activeModal.componentInstance.selectedBrandSeries = this.value['brand']['series'];
    activeModal.componentInstance.selectedSeries = this.value['series'];
    activeModal.componentInstance.brandsData = this.value['brandsData'];
    activeModal.componentInstance.carTypes = this.value['carTypes'];
    activeModal.componentInstance.areasData = this.value['areasData'];
    activeModal.componentInstance.sellcarTableSource = this.value['tableSource'];
    
  }

  onTestClick() {
    console.log("this car Info : ", this.value);
    const activeModal = this.modalService.open(CarTestModal, {size: 'lg'});
    activeModal.componentInstance.modalHeader = '检车结课';
    activeModal.componentInstance.carInfo = this.value;
  }

  onDelete() {
    if (window.confirm('Are you sure you want to delete the car?')) {
      this.apiService.deleteSellcarById(this.value['_id']).then((data) => {
        if (data != null) {
          if (data.status === 200) {
            this.value['tableSource'].remove(this.value);
            this.value['tableSource'].refresh();
          }
        }
        else {
          window.alert("Action failed! Please try again.");
        }
      })      
    }
  }
}


@Component({
  selector: 'sellcar-table',
  template: `
    <div class="form-group">
      <input #search [(ngModel)]="filterSellerId" name="filterSellerId" class="search" type="text" class="form-control" placeholder="卖家ID搜索。。。" (keydown.enter)="onSearch(search.value)">
    </div>
    <div class="form-group">
      <input #search [(ngModel)]="filterUDID" name="filterUDID" class="search" type="text" class="form-control" placeholder="车UDID搜索。。。" (keydown.enter)="onSearchUDID(search.value)">
    </div>
    <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
    `,
  styleUrls: ['../sellCarManager.scss']
})

export class SellCarTable {
  @Input() usersData;
  @Input() brandsData;
  @Input() carTypes;
  @Input() areasData;
  @Input() sellcarsData;
  @Input() filterSellerId;
  @Input() filterUDID;
  @Input() testCategoriesData;

  brandsNameList: any[] = [];

  settings = {
    pager: {
      perPage: 10
    },
    actions: false,
    columns: {
      uniqueId: {
        title: '车源号',
        type: 'string',        
      },
      sellerName: {
        title: '卖家姓名',
        type: 'string',
      },
      // sellerId: {
      //   title: '用户',
      //   type: 'string',
      //   editable: false,
      // },
      sellerPhone: {
        title: '用户电话号码',
        type: 'string',
        editable: false,
      },
      brand: {
        title: '品牌',
        type: 'string',
        valuePrepareFunction: (value) => { return value.chName },
        filterFunction: (value, query) => { 
          if (query === '')
            return true;
          if (Object.keys(value).length !== 0)
            return value.chName.indexOf(query) >= 0;
          else
            return false;
        }
      },
      series: {
        title: '车系',
        type: 'string',
        valuePrepareFunction: (value) => { return value.chName },
        filterFunction: (value, query) => { 
          if (query === '')
            return true;
          if (Object.keys(value).length !== 0)
            return value.chName.indexOf(query) >= 0;
          else
            return false;
        }
      },
      price: {
        title: '价格',
        type: 'string',
        valuePrepareFunction: (value) => { 
          if (value === '')
            return '';
          else
            return value + '万元';
        },
      },
      purchaseDate: {
        title: '上牌时间',
        type: 'string',
        valuePrepareFunction: (value) => { 
          if (value && Object.keys(value).length !== 0)
            return value.year + '-' + (value.month > 9 ? value.month : ('0' + value.month)) + '-' + (value.day > 9 ? value.day : ('0' + value.day));
          else
            return '';
        },
      },
    
      totalDriven: {
        title: '行驶里程',
        type: 'string',
        valuePrepareFunction: (value) => { 
          if (value === '')
            return '';
          else
            return value + '万公里';
        },
      },
      currentCarPlace: {
        title: '验车地址',
        type: 'string'
      },
       marketingStartDate: {
        title: '上架时间',
        type: 'string',
        valuePrepareFunction: (value) => { 
          if (value && Object.keys(value).length !== 0)
            return value.year + '-' + (value.month > 9 ? value.month : ('0' + value.month)) + '-' + (value.day > 9 ? value.day : ('0' + value.day));
          else
            return '';
        },
      },
      status: {
        title: '卖车进度',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '等待验车', title: '等待验车' },
              { value: '在商场', title: '在商场' },
              { value: '看车预约', title: '看车预约' },
              { value: '出售完成', title: '出售完成' }
            ],
          },
        },
     
        editor: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '等待验车', title: '等待验车' },
              { value: '在商场', title: '在商场' },
              { value: '看车预约', title: '看车预约' },
              { value: '出售完成', title: '出售完成' }
            ],
          },
        }
      },
      _id: {
        title: '详情 / 删除',
        type: 'custom',
        editable: false,
        filter: false,
        valuePrepareFunction: (cell, row) => {
          row.brandsData = this.brandsData; 
          row.carTypes = this.carTypes; 
          row.areasData = this.areasData; 
          row.tableSource = this.source;
          row.testCategories = this.testCategoriesData;
          return row
        },
        renderComponent: BtnViewComponent,
      }      

    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: UserService, private spinner: BaThemeSpinner) {
    // this.spinner.hide();
  }
    
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sellcarsData']) {
      if(this.sellcarsData) {
        this.source.load(this.sellcarsData);
      }
    }
    if (changes['brandsData']) {
      if(this.brandsData) {
        this.brandsData.forEach(brand => {
          this.brandsNameList.push({'value': brand.chName, 'title': brand.chName});
        });
        console.log('brand name list', this.brandsNameList);
        this.source.refresh();
      }
    }
    if (changes['filterSellerId']) {
      if(this.filterSellerId) {
        this.onSearch(this.filterSellerId);
      }
    }
    if (changes['filterUDID']) {
      if(this.filterUDID) {
        this.onSearchUDID(this.filterUDID);
      }
    }
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'sellerId',
        search: query
      }
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  onSearchUDID(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'uniqueId',
        search: query
      }
    ], false); 
  }
  
}
