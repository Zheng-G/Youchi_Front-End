import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentsComponent } from './contents.component';
import { routing } from './contents.routing';

import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FAQTable } from './faqTable/faqTable.component';

import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuggestionCarModal } from '../../modals/suggestion-car-modal/suggestion-car-modal.component';
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
    ContentsComponent,
    SuggestionCarModal,
    FAQTable
  ],
  entryComponents: [
    SuggestionCarModal
  ]
})
export class ContentsModule {}
