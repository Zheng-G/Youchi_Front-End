import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { RequestsComponent } from './requests.component';
import { routing } from './requests.routing';

import { BuyerManagerComponent } from './buyer-manager/buyer-manager.component';
import { BuyerRequestTable } from './buyer-manager/buyer-request-table.component';
import { SellerManagerComponent } from './seller-manager/seller-manager.component';
import { SellerRequestTable } from './seller-manager/seller-request-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NgaModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    RequestsComponent,
    BuyerManagerComponent,
    BuyerRequestTable,
    SellerManagerComponent,
    SellerRequestTable
  ]
})
export class RequestsModule {}
