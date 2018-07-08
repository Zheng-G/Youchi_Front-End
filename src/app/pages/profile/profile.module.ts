import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EnrollComponent } from '../../modals/enroll-manager-modal/enroll-manager-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './profile.routing';

import { ProfileComponent } from './profile.component';
import { ProfileTableComponent } from './profileManage/profileTable.component';
import { ProfileDataComponent } from './profileManage/profileData.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NgaModule,
    Ng2SmartTableModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbModule
  ],
  declarations: [
    ProfileComponent,
    ProfileDataComponent,
    ProfileTableComponent,
    EnrollComponent
  ],
  entryComponents: [
    EnrollComponent
  ]
})
export class ProfileModule {}
