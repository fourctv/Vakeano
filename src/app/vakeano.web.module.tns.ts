import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { Routes } from '@angular/router';
import { HttpClientModule }      from '@angular/common/http';

// nativescript
import { NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// plugins
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";


// libs
import { FourDInterface } from './js44D/js44D/JSFourDInterface';
import { FourDModel } from './js44D/js44D/JSFourDModel';
import { FourDCollection } from './js44D/js44D/JSFourDCollection';

// app
import { Config } from './common/index';
import { VakeanoAppComponent } from './vakeanoApp/vakeanoApp.component';
import { routes } from './vakeanoApp/vakeanoApp.component';

// preferences side bar
import { PreferencePanel } from './preferences/preferencesPanel';

// applets
import { LoginComponent  } from './login/login.component';
import { SignUpComponent  } from './login/signUp.component';
import { UserRecommendations } from './userRecommendations/userRecommendations';
import { UserRecommendationPage } from './userRecommendations/userRecommendationPage'; 
import { FeatureRecommendation} from './userRecommendations/featureRecommendation';
import { CuratedProfiles } from './userRecommendations/curatedProfile';
import { UserRating } from './userRating/userRating';
import { FeatureRatingPage } from './userRating/featureRatingPage'; 
import { ProfileBuildingPage } from './userRating/profileBuildingPage'; 

// feature modules
import { MGModule } from './moviegenome/mg.module';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;


@NgModule({
    bootstrap: [
        VakeanoAppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(<any>routes),
        NativeScriptUISideDrawerModule,
        HttpClientModule,
        MGModule
    ],
    exports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        //MultilingualModule
    ],
    declarations: [
        VakeanoAppComponent, LoginComponent, SignUpComponent, PreferencePanel,
        UserRating, FeatureRatingPage, ProfileBuildingPage, CuratedProfiles, 
        UserRecommendationPage, UserRecommendations, FeatureRecommendation
        ],
    entryComponents: [FeatureRecommendation, FeatureRatingPage],
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
