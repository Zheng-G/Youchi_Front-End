import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CarsComponent } from './cars.component';
import { routing } from './cars.routing';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandsTable } from './components/brands/brandsTable/brandsTable.component';
import { SeriesTable } from './components/brands/seriesTable/seriesTable.component';
import { TypeTable } from './components/brands/typeTable/typeTable.component';
import { ColorTable } from './components/brands/colorTable/colorTable.component';
import { CountryTable } from './components/brands/countryTable/countryTable.component';
import { CapabilityTable } from './components/brands/capabilityTable/capabilityTable.component';
import { OilsTable } from './components/brands/oilsTable/oilsTable.component';
import { EmissionTable } from './components/brands/emissionTable/emissionTable.component';
import { LogoEditorComponent } from './components/brands/brandsTable/logoEditor.component';
import { SeriesLogoEditorComponent } from './components/brands/seriesTable/seriesLogoEditor.component';
import { TypeLogoEditorComponent } from './components/brands/typeTable/typeLogoEditor.component';

import { UserManagerComponent } from './components/userManager/user-manager.component';
import { UserTable } from './components/userManager/userTable/userTable.component';
import { ProfileEditorComponent } from './components/userManager/userTable/profileEditor.component';

import { SellCarManagerComponent } from './components/sellCarManager/sellCarManager.component';
import { ButtonViewComponent } from './components/userManager/userTable/userTable.component';
import { SellCarTable } from './components/sellCarManager/sellCarTable/sellCarTable.component';
import { BtnViewComponent } from './components/sellCarManager/sellCarTable/sellCarTable.component';

import { TestDBManagerComponent } from './components/tests/tests.component';
import { AreaTable } from './components/tests/areaTable/areaTable.component';
import { TestCategoryTable } from './components/tests/testCategoryTable/testCategoryTable.component';
import { TestCategoryItemTable } from './components/tests/testCategoryItemTable/testCategoryItemTable.component';

import { CarInfoModal } from '../../modals/car-info-modal/car-info-modal.component';
import { CarTestModal } from '../../modals/car-test-modal/car-test-modal.component';

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
    CarsComponent,
    BrandsComponent,
    BrandsTable,
    SeriesTable,
    TypeTable,
    LogoEditorComponent,
    SeriesLogoEditorComponent,
    TypeLogoEditorComponent,
    ProfileEditorComponent,
    ColorTable,
    CountryTable,
    CapabilityTable,
    OilsTable,
    EmissionTable,
    UserTable,
    UserManagerComponent,
    ButtonViewComponent,
    SellCarManagerComponent,
    CarInfoModal,
    CarTestModal,
    SellCarTable,
    BtnViewComponent,
    TestDBManagerComponent,
    AreaTable,
    TestCategoryTable,
    TestCategoryItemTable
  ],
  entryComponents: [
    LogoEditorComponent,
    SeriesLogoEditorComponent,
    TypeLogoEditorComponent,
    ProfileEditorComponent,
    ButtonViewComponent,
    CarInfoModal,
    CarTestModal,
    BtnViewComponent,
  ],
  providers: [
  ]
})
export class CarsModule {}