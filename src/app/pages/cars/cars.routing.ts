import { Routes, RouterModule } from '@angular/router';

import { CarsComponent } from './cars.component';
import { BrandsComponent } from './components/brands/brands.component';
import { TestDBManagerComponent } from './components/tests/tests.component';
import { UserManagerComponent } from './components/userManager/user-manager.component';
import { SellCarManagerComponent } from './components/sellCarManager/sellCarManager.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent,
    children: [
      { path: 'brands', component: BrandsComponent },
      { path: 'testDB-manager', component: TestDBManagerComponent },
      { path: 'user-manager', component: UserManagerComponent, data: {userPhone: ''} },
      { path: 'sell-car-manager', component: SellCarManagerComponent, data: {sellerId: '', sellcarUDID: ''} },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
