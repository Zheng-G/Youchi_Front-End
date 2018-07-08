import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeedbackComponent } from './feedback.component';
import { routing } from './feedback.routing';

import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FEEDTable } from './feedTable/feedTable.component';

import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    FeedbackComponent,
    FEEDTable
  ],
  entryComponents: [
  ]
})
export class FeedbackModule {}
