import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';


// libs
import { FourDInterface } from './js44D/js44D/JSFourDInterface';
import { FourDModel } from './js44D/js44D/JSFourDModel';
import { FourDCollection } from './js44D/js44D/JSFourDCollection';

// app
import { Config } from './common/index';
import { FourDAdminComponent } from './fourDAdmin/fourDAdmin.component';

// applets
import { BlankPage } from './fourDAdmin/blankPage';
import { LoginComponent  } from './login/login.component';

// feature modules
//import { JS44DModule } from './js44D/js44D.module';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'browseTable', loadChildren: 'app/browseTable/browseTable.module#BrowseTableModule'},
    {path: 'listEditor', loadChildren: 'app/listEditor/listEditor.module#ListEditorModule'},
    {path: '**',  component: BlankPage}
];

@NgModule({
    bootstrap: [
        FourDAdminComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(<any>routes),
  //      JS44DModule
    ],
    exports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        //MultilingualModule
    ],
    declarations: [
        FourDAdminComponent, BlankPage, LoginComponent
        ],
    providers: [
        // Allows your {N} application to use lazy-loading
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
        FourDInterface, FourDModel, FourDCollection
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WebModule { }
