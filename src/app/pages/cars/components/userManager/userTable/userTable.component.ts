import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { AreaService } from '../../../../../services/area.service';
import { UserService } from '../../../../../services/user.service';
import { CarTypeService } from '../../../../../services/carType.service';
import { BrandsService } from '../../../../../services/brands.service';

import { CarType } from '../../../../../models/carType';
import { Area } from '../../../../../models/area';
import { ProfileEditorComponent } from './profileEditor.component';
 import {AppConfig} from '../../../../../app.config';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarInfoModal } from '../../../../../modals/car-info-modal/car-info-modal.component';
import { BaThemeSpinner } from '../../../../../theme/services/baThemeSpinner';
@Component({
  selector: 'button-view',
  template: `
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-danger" (click)="onRegisterCar()">车登录</button>
          <button type="button" class="btn btn-info" (click)="onViewCar()">车库</button>
        </div>

  `,
  
})
export class ButtonViewComponent implements ViewCell, OnInit {
  
  @Input() value: string | number;

  @Output() save: EventEmitter<any> = new EventEmitter();

  // brandsData: any;
  // carTypes: any;
  // areasData: any;

  constructor(private router: Router, private modalService: NgbModal, private userService: UserService, private carTypeService: CarTypeService,
                 private brandsServie: BrandsService, private spinner: BaThemeSpinner) {
  }

  ngOnInit() {
  }

  onViewCar() {
    this.router.navigate(['/pages/cars/sell-car-manager', {sellerId: this.value['_id'], sellcarUDID: ''} ]);
  }

  onRegisterCar() {
    
     if (this.value['brandsData'] == undefined || this.value['carTypes'] == undefined) {
        this.spinner.showUploadStatus();
        this.brandsServie.getBrands().then((data) =>{
          this.value['brandsData'] = data;
          this.carTypeService.getCarTypes().then((data) => {
            this.value['carTypes'] = data;
            this.spinner.hideUploadStatus();
            this.showModal()
           });
        });
     }
     else {
      this.showModal()
       
    }
  }
  showModal() {
       const activeModal = this.modalService.open(CarInfoModal, {size: 'lg'});
        activeModal.componentInstance.mode = 'create';
        activeModal.componentInstance.modalHeader = this.value['userName'] + '车登陆';
        activeModal.componentInstance.userData = this.value;
        activeModal.componentInstance.brandsData = this.value['brandsData'];
        activeModal.componentInstance.carTypes = this.value['carTypes'];
        activeModal.componentInstance.areasData = this.value['areasData'];
  }
}



@Component({
  selector: 'user-table',
  template: `
    <div class="form-group">
      <input #search [(ngModel)]="filterUserPhone" name="filterUserPhone" class="search" type="text" class="form-control" placeholder="用户电话号码搜索。。。" (keydown.enter)="onSearchPhone(search.value)">
    </div>
    <ng2-smart-table [settings]="settings" [source]="source" (deleteConfirm)="onDeleteConfirm($event)" (editConfirm)="onSaveConfirm($event)"
     (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
    `,
  styleUrls: ['../user-manager.scss']
})

export class UserTable implements AfterViewInit{
  @Input() usersData;
  @Input() brandsData;
  @Input() carTypes;
  @Input() areasData;
  @Input() filterUserPhone;
   // private config: AppConfig;
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
      phoneNumber: {
          title: '电话号码',
          type: 'string'
      },
      userName: {
        title: '用户名',
        type: 'string',
        width: '10%'
      },
      profileImage: {
        title: '头像',
        type: 'html',
        valuePrepareFunction: 
            (value) => { return `<img width="50px" height="50px" src="`+value + `" />` },
        filter: false,
        editor: {
          type: 'custom',
          component: ProfileEditorComponent,
        },
      },
      gender: {
        title: '生别',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '男', title: '男' },
              { value: '女', title: '女' }
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '男', title: '男' },
              { value: '女', title: '女' }
            ],
          },
        },
      },
      bDay: {
          title: '生日',
          type: 'string'
      },
      address: {
        title: '地址',
        type: 'string'
      },
      type: {
        title: '用户类型',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '一般', title: '一般' },
              { value: 'VIP', title: 'VIP' }
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: '选择...',
            list: [
              { value: '一般', title: '一般' },
              { value: 'VIP', title: 'VIP' }
            ],
          },
        },
      },
      _id: {
        title: '车登录 / 车库',
        type: 'custom',
        editable: false,
        filter: false,
        valuePrepareFunction: (cell, row) => {
          row.brandsData = this.brandsData; 
          row.carTypes = this.carTypes; 
          row.areasData = this.areasData; 
          return row;
        },
        renderComponent: ButtonViewComponent,
      }
      
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: UserService,  
              private carTypeService: CarTypeService,
              private brandServie: BrandsService,
              private spinner: BaThemeSpinner) {
        this.spinner.hide();
         // this.config = new AppConfig;
  }

  ngOnInit() {
  
  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usersData']) {
      if(this.usersData) {
        this.source.load(this.usersData);
      }
    }
    if (changes['filterUserPhone']) {
      if(this.filterUserPhone) {
        this.onSearchPhone(this.filterUserPhone);
      }
    }    
  }

  onSearchPhone(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'phoneNumber',
        search: query
      }
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  onCreateConfirm(event):void { 
    // phone number validation
    // check phone number is containing only numbers
    if ( !this.validationForNumber(event.newData.phoneNumber) ) {
      alert('Please input valid Phonenumber');
      event.confirm.reject();
      return;
    }
    
    //check if phone number is double
    var phoneDouble: any = 0;
    if (this.usersData) {
      this.usersData.forEach(element => {
        if (element.phoneNumber === event.newData.phoneNumber) {
          return phoneDouble = 1;
        }
        return;
      });
    }

    if (phoneDouble === 1) {
      window.alert("The user with phone number " + event.newData.phoneNumber + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        console.log("new user data : ", event.newData);
        delete event.newData._id;
        this.service.createUser(event.newData).then((data) => {
          if (data != null) {
            if (data.status === 200) {
              event.newData._id = JSON.parse(data._body)[0]._id;
              event.confirm.resolve(event.newData);
              console.log("new new user data : ", event.newData);
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

  } 

  onSaveConfirm(event):void {
    // array without editing row
    var temp = this.usersData.filter(function(area) { return !(area.phoneNumber === event.data.phoneNumber); });

    //check if name changed
    var nameDouble: any = 0;
    if (event.data.phoneNumber != event.newData.phoneNumber) {

      // phone number validation
      // check phone number is containing only numbers
      if ( !this.validationForNumber(event.newData.phoneNumber) ) {
        alert('Please input valid Phonenumber');
        event.confirm.reject();
        return;
      }

      temp.forEach(element => {
        if (element.phoneNumber === event.newData.phoneNumber) {
          return nameDouble = 1;
        }
        return;
      });
    }

    if (nameDouble === 1) {
      window.alert("The user with phone number " + event.newData.chName + " is already exist!");
      event.confirm.reject();
    }
    else {
      if (window.confirm('Are you sure you want to save?')) {
        this.source.getAll().then((data)=>{
          console.log("new user data : ", event.newData);
          // delete event.newData._id;
          this.service.updateUser(event.newData).then((data) => {
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
      this.service.deleteUser(event.data).then((data) => {
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

  validationForNumber(inputtxt) {
    var regexp = new RegExp('[0-9]'),
      test = regexp.test(inputtxt);
      return test;
  }
  
  
}
