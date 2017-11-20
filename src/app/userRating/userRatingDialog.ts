import { Component, Input, AfterViewInit } from '@angular/core';

import { ICustomModal, ICustomModalComponent, ModalConfig, ModalDialogInstance } from 'js44d/ui';

@Component({
    selector: 'userrating-dialog',
    template : '<user-rating [currentUser]="profileUserID" [currentProfile]="currentProfileID"></user-rating>'
})

export class UserRatingDialog implements ICustomModalComponent, AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'], position: {top:100, left:100},selfCentered:true,
            title:'User Rating',
            isResizable:true,
            width:1100, height:800};
   
    public dialog: ModalDialogInstance;
          
    @Input() public profileUserID:number = 0;
    @Input() public currentProfileID:number = 0;
    private userName:string = '';
    
    public set modelContentData(v:ICustomModal) {
        if (v) {
                let parms:Object = v;
                if (parms.hasOwnProperty('currentProfile')) {
                    this.currentProfileID = parms['currentProfile'];
                }
                if (parms.hasOwnProperty('profileUserID')) {
                    this.profileUserID = parms['profileUserID'];
                }
                if (parms.hasOwnProperty('userName')) {
                    this.userName = parms['userName'];
                }
            }
    }

    ngAfterViewInit() {
        if (this.userName != '') this.dialog.setTitle('Profile Building for: '+this.userName);
    }

}
