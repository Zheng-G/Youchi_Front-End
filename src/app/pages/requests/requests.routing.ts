import { Routes, RouterModule } from '@angular/router';

import { RequestsComponent } from './requests.component';
import { BuyerManagerComponent } from './buyer-manager/buyer-manager.component';
import { SellerManagerComponent } from './seller-manager/seller-manager.component';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    children: [
      { path: 'buyer-manager', component: BuyerManagerComponent },
      { path: 'seller-manager', component: SellerManagerComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
