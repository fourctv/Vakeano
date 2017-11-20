import { Component, Input, AfterViewInit } from '@angular/core';

import { ICustomModal, ICustomModalComponent, ModalConfig, ModalDialogInstance } from 'js44d/ui';

@Component({
    selector: 'userrecommendations-dialog',
    template : '<user-recommendations [profileID]="profileID" [profileName]="profileName" [profileUser]="profileUserID"></user-recommendations>'
})

export class UserRecommendationsDialog implements ICustomModalComponent, AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'],
            selfCentered:true,
            title:'User Recommendations',
            isResizable:true,
            width:1100, height:800};
    
    public dialog: ModalDialogInstance;
         
    @Input() public profileID:number;
    @Input() public profileName:string;
    @Input() public profileUserID:number;
    private userName:string = '';

    public set modelContentData(v:ICustomModal) {
        if (v) {
            let parms:Object = v;
            if (parms.hasOwnProperty('profileID')) {
                this.profileID = parms['profileID'];
                this.profileName = parms['profileName'];
                this.profileUserID = parms['profileUserID'];
                this.userName = parms['userName'];
                }
            }
    }

    ngAfterViewInit() {
        if (this.userName != '') this.dialog.setTitle('User Recomendations for: '+this.userName);
    }

}
