import { Component, NgModule,NgModuleFactory, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule} from "@angular/forms"
import { AppConfig } from '../../app.config';
import { ManagerService } from '../../services/manager.service';
import { ProfileTableComponent } from '../../pages/profile/profileManage/profileTable.component';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'enroll-manager-modal',
  styleUrls: [('./enroll-manager-modal.scss')],
  templateUrl: './enroll-manager-modal.html',
  providers: [ManagerService]
})

export class EnrollComponent implements AfterViewInit {
  mode: string;
  _id: string;
  index: number;
  username: string;
  password: string;
  confirmPassword: string;
  error: string;
  parentInstance : ProfileTableComponent;

  constructor(private activeModal: NgbActiveModal,
              private cdr: ChangeDetectorRef, 
              private managerService: ManagerService) {
  }

  ngAfterViewInit(){
    this.cdr.detectChanges();
  }

  onSave() {
    if(this.mode == 'create') {
      if(this.password && this.password == this.confirmPassword) {
        this.managerService.createManager({
          username: this.username,
          password: this.password
        }).then((res) => {
          console.log(res);
          if(res.success == true) {
            this.activeModal.close();
            this.parentInstance.managerDatas.push({
              role: 'manager',
              username: this.username,
              _id: res.data._id
            });
            this.parentInstance.refresh();
          }
        });
      } else {
        this.error = "Password and confirm does not match.";
      }
    } else if(this.mode == 'edit') {
      if((this.password || this.confirmPassword) && this.password != this.confirmPassword) {
        this.error = "Password and confirm does not match.";
      } else {
        var param = { _id: this._id, username: this.username };
        if(this.password)
          param['password'] = this.password;

        this.managerService.editManager(param).then((res) => {
          if(res.success == true) {
            this.activeModal.close();
            this.parentInstance.managerDatas[this.index].username = this.username;
            this.parentInstance.refresh();
          }
        });
      }
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
