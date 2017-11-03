import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

import { Config } from '../common/index';

import { FourDInterface, MD5 } from '../js44D/js44D/JSFourDInterface';


@Component({
    selector: 'log-in',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls : ['login.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent {


    @Input() public username:string = '';
    @Input() public password:string = '';
    @Input() public showError:string = '';
    @Input() public fourDVersion:string = '';
    @Input() public webAppVersion:string = Config.APP_VERSION;


    constructor( private fourD:FourDInterface, public router:RouterExtensions ) {
        this.fourD.call4DRESTMethod('REST_GetApplicationVersion',{}, {responseType:'text'})
            .subscribe((v) => {
                this.fourDVersion = v;
                this.webAppVersion += ' - v'+this.fourDVersion;
            });
    }

    //
    // log into Movie Genome
    //
    login() {
        let md5pwd:string = MD5.md5(this.password);
        this.fourD.signIn(this.username, md5pwd.toUpperCase())
            .then((authentication) => {
                if (FourDInterface.authentication) {
                    this.router.navigate(['/userRecommendationPage'], { skipLocationChange: true, clearHistory:true, transition:{name:'fade' } });
 
                    this.showError = '';
                } else {
                    console.log('oops');
                    this.showError = 'Sorry, the username and/or password was incorrect';
                }
            })
            .catch((e) => {
                console.log(e);
                this.showError = 'Sorry, the username and/or password was incorrect';
            });
    }

    //
    // New user sign uo
    //
    signUp() {
        console.log('go signup');
        this.router.navigate(['/signUp'], { }); // go to the signUp page
        
    }

    //
    // for debugging swipe support on android
    //
    swipe(event) {
        console.log('swipe:'+event.direction);
    }
}
