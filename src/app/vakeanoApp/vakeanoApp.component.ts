import { Component, AfterContentInit, ViewContainerRef} from '@angular/core';
import { Routes, Router } from '@angular/router';
import { HttpClient }      from '@angular/common/http';

import { Config } from '../common/index';

import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../login/signUp.component';
import { Modal } from '../js44D/angular2-modal/providers/Modal';
import { FourDInterface } from '../js44D/js44D/JSFourDInterface';

import { BlankPage } from './blankPage';

export const routes: Routes = [
    {path: 'login', component: BlankPage},
    {path: 'featureList', loadChildren:'app/featureList/featureListModule#FeatureListModule'},
    {path: 'userProfileList', loadChildren:'app/userProfileList/userProfileListModule#UserProfileListModule'},
    {path: 'genomeMapList', loadChildren:'app/genomeMapList/genomeMapListModule#GenomeMapListModule'},
    {path: 'userRating', loadChildren:'app/userRating/userRatingModule#UserRatingModule'},
    {path: 'userRecommendations', loadChildren:'app/userRecommendations/userRecommendationsModule#UserRecommendationsModule'},
    {path: 'userManagement', loadChildren:'app/userManagement/userManagement.module#UserManagementModule'},
    {path: 'theaterManagement', loadChildren:'app/theaterManagement/theaterManagement.module#TheaterManagementModule'},
    {path: '**',  component: BlankPage}
];


@Component({
    moduleId: module.id,
    selector: 'vakeano-app',
    providers: [ Modal, FourDInterface ],
    templateUrl: 'vakeanoApp.component.html',
    styleUrls: ['vakeanoApp.component.css']
})


export class VakeanoAppComponent implements AfterContentInit {
    public menuList = [
        {
            routePath: '/userRating',
            roles: ['Viewer', 'Admin'],
            hideMenu: false,
            title: 'User Rating'
        },
        {
            routePath: '/userRecommendations',
            roles: ['Viewer', 'Admin'],
            hideMenu: false,
            title: 'User Recommendations'
        },
        {
            routePath: '/featureList',
            roles: ['Curator', 'Admin'],
            hideMenu: false,
            title: 'Features'
        },
        {
            routePath: '/userProfileList',
            roles: ['Admin'],
            hideMenu: false,
            title: 'Taste Profiles'
        },
        {
            routePath: '/genomeMapList',
            roles: ['Admin'],
            hideMenu: false,
            title: 'Genome Map'
        },
        {
            routePath: '/theaterManagement',
            roles: ['Admin'],
            hideMenu: false,
            title: 'Theaters'
        },
        {
            routePath: '/userManagement',
            roles: ['Admin'],
            hideMenu: false,
            title: 'User Mgmt'
        }
    ];

    public get currentUser(): string {
        return (FourDInterface.authentication) ? FourDInterface.currentUser : '?';
    }

    public userIsAdmin:boolean = false;


    constructor (public router:Router, private http:HttpClient, private modal: Modal, private hostViewRef: ViewContainerRef) {
        FourDInterface.http = http;
//        FourDInterface.fourDUrl = 'http://localhost:8080';
        FourDInterface.fourDUrl = 'http://www.vakeano.com';
        Modal.hostViewRef = this.hostViewRef;
    }

    ngAfterContentInit() {
             // no predefined user, login...
        if (Config.PLATFORM_TARGET === Config.PLATFORMS.WEB) this.showLoginDialog();
    }
    
    userHasLoggedIn(isNew:boolean = false) {
        // load current profile user functions
        if (this.userIsLoggedIn) {
            this.userIsAdmin = FourDInterface.authentication.options.isAdmin === 'true';           
            FourDInterface.runningInsideWorkspace = true; // we are indeed running inside the workspace
 
            // now we need to check user Roles and enable/disable menus accordingly
            if (FourDInterface.authentication.options.isAdmin !== 'true') {
                this.menuList.forEach(element => {
                    element.hideMenu = !this.userHasAccess(element.roles);
                });
                this.router.navigate((isNew)?['/userRating']:['/userRecommendations'], { skipLocationChange: true });
            } else {
                 this.menuList.forEach(element => {
                    element.hideMenu = false;
                });               
            }
       }

    }


    get userIsLoggedIn(): boolean { return FourDInterface.authentication !== undefined && FourDInterface.authentication !== null; }

    doLogin() {
        FourDInterface.authentication = null;
        this.router.navigate(['/login'], { skipLocationChange: true });
        if (Config.PLATFORM_TARGET === Config.PLATFORMS.WEB) this.showLoginDialog();
    }

    showLoginDialog() {
        this.modal.openDialog(<any>LoginComponent, null)
            .then((result) => {
                switch (result) {
                    case 'loggedin':
                        this.userHasLoggedIn();
                        break;
                
                    case 'signUp':
                        this.showSignUpDialog();
                        break;
                }
            });        
    }

    showSignUpDialog() {
        this.modal.openDialog(<any>SignUpComponent, null)
            .then((result) => {
                switch (result) {
                    case 'signedUp':
                        this.userHasLoggedIn(true);
                        break;
                
                    case 'login':
                        this.showLoginDialog();
                        break;
                }
            });        
        
    }


    userHasAccess(roles: Array<string>): boolean {

        let found: boolean = false;
        roles.forEach((role) => {
            if (FourDInterface.authentication.groups.findIndex((value) => { return value === role; }) >= 0) found = true;
        });
        return found;
    }

    openApp(menu) {
       if (FourDInterface.authentication) {
           this.router.navigate([menu.routePath], { skipLocationChange: true });
       }
    }

    showAbout() {
        window.open("https://vakeano.godaddysites.com", '_blank')
    }

}
