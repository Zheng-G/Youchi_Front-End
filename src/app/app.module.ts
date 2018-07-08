import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { ApiService } from './services/api.service';
import { ProfileService } from './services/profile.service';
import { LoginService } from './login.service';
import { AuthGuard } from './guards/loggedin.guard';
import { BrandsService } from './services/brands.service';
import { HttpClient } from './services/upload.service';
import { CarTypeService } from './services/carType.service';
import { AreaService } from './services/area.service';
import { TestItemService } from './services/testItem.service';
import { UserService } from './services/user.service';
import { SellCarService } from './services/sellCar.service';
import { BuyerRequestService } from './services/buyerRequest.service';
import { SellerRequestService } from './services/sellerRequest.service';
import { ManagerService } from './services/manager.service';
import { FAQService } from './services/faq.service';
import { FEEDService } from './services/feed.service';
import { SuggestiveCarService } from './services/suggestiveCar.service';
import { CommonService } from './services/observe.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

import { AppConfig } from './app.config';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  ApiService,
  ProfileService,
  LoginService,
  AuthGuard,
  BrandsService,
  CarTypeService,
  AreaService,
  TestItemService,
  UserService,
  SellCarService,
  BuyerRequestService,
  SellerRequestService,
  HttpClient,
  FAQService,
  FEEDService,
  ManagerService,
  SuggestiveCarService,
  CommonService        
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AppConfig
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
