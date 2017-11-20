// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';
import { HttpClientModule }      from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// libs
import { FourDInterface, FourDModel, FourDCollection } from 'js44d';

// app
import { VakeanoAppComponent } from './vakeanoApp/vakeanoApp.component';
import { routes } from './vakeanoApp/vakeanoApp.component';

// applets
import { BlankPage } from './vakeanoApp/blankPage';
import { LoginComponent  } from './login/login.component';
import { SignUpComponent  } from './login/signUp.component';

// feature modules
import { JS44DModule, ModalModule } from 'js44d/ui';
import { MGModule } from './moviegenome/mg.module';

let routerModule = RouterModule.forRoot(routes);



@NgModule({
  imports: [
    BrowserModule,  
    FormsModule,
    CommonModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    routerModule,
    JS44DModule, ModalModule,
    MGModule
  ],
  declarations: [ VakeanoAppComponent, BlankPage, LoginComponent, SignUpComponent
                ],
  providers: [
    FourDInterface, FourDModel, FourDCollection
  ],
  exports: [JS44DModule, ModalModule, MGModule ],
  entryComponents: [ LoginComponent, SignUpComponent ],
  bootstrap: [ VakeanoAppComponent ]
})

export class WebModule { }
