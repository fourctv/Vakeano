// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';
import { HttpModule }      from '@angular/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// libs
import { FourDInterface } from './js44D/js44D/JSFourDInterface';
import { FourDModel } from './js44D/js44D/JSFourDModel';
import { FourDCollection } from './js44D/js44D/JSFourDCollection';

// app
import { VakeanoAppComponent } from './vakeanoApp/vakeanoApp.component';
import { routes } from './vakeanoApp/vakeanoApp.component';

// applets
import { BlankPage } from './vakeanoApp/blankPage';
import { LoginComponent  } from './login/login.component';

// feature modules
import { JS44DModule } from './js44D/js44D.module';
import { ModalModule } from './js44D/modal.module';
import { MGModule } from './moviegenome/mg.module';

let routerModule = RouterModule.forRoot(routes);



@NgModule({
  imports: [
    BrowserModule,  
    FormsModule,
    CommonModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    routerModule,
    JS44DModule, ModalModule,
    MGModule
  ],
  declarations: [ VakeanoAppComponent, BlankPage, LoginComponent
                ],
  providers: [
    FourDInterface, FourDModel, FourDCollection
  ],
  exports: [JS44DModule, ModalModule, MGModule ],
  entryComponents: [ LoginComponent ],
  bootstrap: [ VakeanoAppComponent ]
})

export class WebModule { }
