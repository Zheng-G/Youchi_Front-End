import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { ManagerService } from '../../../services/manager.service';
import { EnrollComponent } from '../../../modals/enroll-manager-modal/enroll-manager-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'manager-table',
  template: `
    <ng2-smart-table [settings]="settings" [source]="source" (delete)="onDelete($event)" (edit)="onSave($event)"
     (create)="onCreate($event)"></ng2-smart-table>
    `,
  styleUrls: ['../profile.scss']
})

export class ProfileTableComponent {
  @Input() managerDatas;

  settings = {
    mode: 'external',
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
      username: {
          title: '经理',
          type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: ManagerService, private modal: NgbModal) {}

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['managerDatas']) {
      if(this.managerDatas) {
        this.source.load(this.managerDatas);
      }
    }
  }

  refresh() {
    this.source.load(this.managerDatas);
  }

  onCreate(event):void {
    const activeModal = this.modal.open(EnrollComponent, { size: 'lg' });
    activeModal.componentInstance.mode = 'create';
    activeModal.componentInstance.parentInstance = this;
  } 

  onSave(event):void {
    const activeModal = this.modal.open(EnrollComponent, { size: 'lg' });
    activeModal.componentInstance.mode = 'edit';
    activeModal.componentInstance.parentInstance = this;
    activeModal.componentInstance.username = event.data.username;
    activeModal.componentInstance._id = event.data._id;
    activeModal.componentInstance.index = event.index;
  }

  
  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteManager(event.data).then((res) => {
        if (res.success == true) {
          this.managerDatas.splice(event.index, 1);
          this.refresh();
        }
      });
    }
  }
}
