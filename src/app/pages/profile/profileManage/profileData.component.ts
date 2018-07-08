import { Component } from '@angular/core';
import { ManagerService } from '../../../services/manager.service';
import { ApiService } from '../../../services/api.service';
import { ProfileTableComponent } from './profileTable.component';
@Component({
  selector: 'managers',
  templateUrl: './profile.html',
  styleUrls: ['../profile.scss']
})

export class ProfileDataComponent {
  public managerDatas: any[];

  constructor(public service: ManagerService, private api: ApiService) {
    this.service.getManagers().then((data) => {
      this.managerDatas = data;
    })
  }

  ngOnInit() {
  }
}
