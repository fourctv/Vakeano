import { Component, Input } from '@angular/core';

import { ModalDialogInstance } from '../js44D/angular2-modal/models/ModalDialogInstance';
import { ICustomModalComponent } from '../js44D/angular2-modal/models/ICustomModalComponent';
import { ModalConfig } from '../js44D/angular2-modal/models/ModalConfig';

import { FourDInterface,  MD5 } from '../js44D/js44D/JSFourDInterface';
import { ShellUsers } from  '../moviegenome/index';

@Component({
    selector: 'signup',
    moduleId: module.id,
    templateUrl: 'signUp.component.html',
    styleUrls:['login.component.css']
})

export class SignUpComponent implements ICustomModalComponent {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'sm', 
    selfCentered:true,
    isResizable: false,
    isModal: true,
    isBlocking: true,
    title:'Sign Up to Vakeano',
    width:1063, height:667};

    @Input() public userRecord:ShellUsers = new ShellUsers();
    @Input() public showError:string = '';
    @Input() public repeatPassword:string = '';

    constructor(public dialog: ModalDialogInstance, private fourD:FourDInterface) {
        
    }


    //
    // New user sign uo
    //
    signUp() {
        this.showError = '';
        if (this.userRecord.UserName === null || this.userRecord.UserName === undefined || this.userRecord.UserName === '') {
            this.showError = 'Need username';
        } else if (this.userRecord.Password === null || this.userRecord.Password === undefined || this.userRecord.Password === '') {
            this.showError = 'Need password';
        } else if (this.userRecord.Password !== this.repeatPassword) {
            this.showError = 'Passwords do not match';
        } else if (this.userRecord.FirstName === null || this.userRecord.FirstName === undefined || this.userRecord.FirstName === '') {
            this.showError = 'Need first name';
        } else if (this.userRecord.LastName === null || this.userRecord.LastName === undefined || this.userRecord.LastName === '') {
            this.showError = 'Need last name';
        /*} else if (this.userRecord.emailAddress === null || this.userRecord.emailAddress === undefined || this.userRecord.emailAddress === '') {
            this.showError = 'Need email address';*/
        } else {
            // all good, add user to the database
            let md5pwd:string = MD5.md5('admin');
            //this.log.debug('sign in:'+this.username +'/'+ md5pwd.toUpperCase());
            this.fourD.signIn('admin', md5pwd.toUpperCase())
             .then((authentication) => {
                 if (FourDInterface.authentication) {this.validateUserName()}
             })
           .catch((e) => {
                console.log('error:'+e);
                this.showError = 'Unable to communicate with server.';
            });

        }
    }

    validateUserName() {
        let checkUser:ShellUsers = new ShellUsers();
        checkUser.getRecord(null, null, {query: [ShellUsers.kUserName+';=;'+this.userRecord.UserName]})
        .then(rec => {
            if (checkUser.isRecordLoaded) {
                this.showError = 'Username already taken';
            } else this.addNewUser();
        })
        .catch((e) => {
            console.log('error:'+e);
            if (e === 'recordNotFound') {
                this.addNewUser();
            } else this.showError = 'Unable to communicate with server.';
        });
   }

    addNewUser() {
        //this.log.debug('add new user name:'+this.userRecord.UserName);
        this.userRecord.fourdSaveCallbackMethod_ = 'MGSEAddNewUser';
        this.userRecord.Password = MD5.md5(this.repeatPassword);
        this.userRecord.insertRecord()
                .then( rec => { this.buildProfile()})
                .catch(err => {this.showError='Unable to add user: '+err});
    }
    //
    // back to login
    //
    login() {
         this.dialog.close('login');      
    }

    //
    // build user profile
    //
    buildProfile() {
        let md5pwd:string = MD5.md5(this.repeatPassword);
        this.fourD.signIn(this.userRecord.UserName, md5pwd.toUpperCase())
            .then((authentication) => {
                if (FourDInterface.authentication) {
                    this.showError = 'logging in...';
                    this.dialog.close('signedUp');

                } else {
                     this.showError = 'oops! something wrong happenend, unable to sign in.';
                }
            })
            .catch((e) => {
                console.log('error:'+e);
                this.showError = 'oops! something wrong happenend.';
            });
   }
}
