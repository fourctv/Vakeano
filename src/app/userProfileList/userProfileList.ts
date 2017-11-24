import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgModel} from '@angular/forms';

import { FourDInterface } from 'js44d';
import { Modal, ModalDialogInstance } from 'js44d';
import { DataGrid } from 'js44d';

import { TasteProfilesEx } from '../moviegenome/index';

import { UserProfileInfoDialog } from './userProfileInfoDialog';
import { UserRecommendationsDialog } from '../userRecommendations/userRecommendationsDialog';
import { UserRatingDialog } from '../userRating/userRatingDialog';

@Component({
    selector: 'userprofile-list',
    providers: [Modal, NgModel],
    template: `
    <web-application>
        <record-list [editWindow]="editWindow" [dialogInstance]="dialog">
            <query-band [enableSort]="true" [enableQBE]="true" [enableButtonBar]="true" [enableAddRecord]="true" [enableDeleteRecord]="true" [cascadeDeleteRecord]="true">
                <queryband class="form-group">
                    <userprofile-queryband #customQueryBand class="form-group"></userprofile-queryband>
                </queryband>
                <custombuttonbar>
                    <button class="regularButton" style="width:120px;" (click)="showRatings()">Ratings</button>
                    <button class="regularButton" style="width:120px;" (click)="showRecommendations()">Recommendations</button>
                    <button class="regularButton" style="width:120px;" (click)="recalcRecommendations()">Rec. All Recom.</button>
                </custombuttonbar>
            </query-band>

            <datagrid
                [model]="model"
                [columns]="columnDefs"
                [optimizeGridLoading]="true"
                [pageSize]="50"
                [useLazyLoading]="true"
                >
            </datagrid>
        </record-list>
     </web-application>
    `
})

export class UserProfileListApp {  
      
    /**
     * get the associated Datagrid object instance
     */
    @ViewChild(DataGrid) theGrid: DataGrid;

    //
    // our Modal Dialog instance, populated by the Modal service, when running inside
    //
    public dialog:ModalDialogInstance = null;
    
    //
    // Declare Program edit Window
    //
    public editWindow = UserProfileInfoDialog;
    
    //
    // Declare Datagrid properties
    //
    public model = TasteProfilesEx; // the record datamodel to use 
    // the columns for the datagrid
    public columnDefs = [
        { title: 'Profile ID', field: 'ProfileID', width:80},
        { title: 'User ID', field: 'UserID', width:80},
        { title: 'User Name', field: 'UserName', width:150 },
        { title: 'Profile Name', field: 'Name', width:150 },
        { title: 'Origin', field: 'Origin', width:150, filterable: { multi: true } },
        { title: 'Enabled?', field: 'GenomeEnabled', width:80 },
        { title: 'Priority', field: 'Priority', filterable: { search: true} },
        { title: 'Frequency', field: 'UsageFrequency', width:150, filterable: { multi: true} },
        { title: 'Description', field: 'Description', width:250}
    ];


    //
    // We need access to a Modal dialog component, to open an associated Record Edit Form 
    //
    constructor(private modal: Modal, private viewref:ViewContainerRef, private fourD:FourDInterface, private http:HttpClient) {
        if (!FourDInterface.http) FourDInterface.http = http;
    }

    public showRecommendations() {
        if (this.theGrid && this.theGrid.currentRecord && this.theGrid.currentRecord.isRecordLoaded()) {
            let theRec:TasteProfilesEx = <any>this.theGrid.currentRecord; 
            this.modal.openDialog(UserRecommendationsDialog, 
                {
                    profileID:theRec.ProfileID, 
                    profileName:theRec.Name, 
                    profileUserID:theRec.UserID,
                    userName: theRec.UserName
                }); // open user recomendations dialog

        }
    }

    public showRatings() {
        if (this.theGrid && this.theGrid.currentRecord && this.theGrid.currentRecord.isRecordLoaded()) {
            let theRec:TasteProfilesEx = <any>this.theGrid.currentRecord; 
            this.modal.openDialog(UserRatingDialog, {currentProfile:theRec.ProfileID, profileUserID:theRec.UserID, userName: theRec.UserName}); // open user recomendations dialog

        }
    }
    
    public recalcRecommendations() {
         let body = {};
            kendo.ui.progress($(this.viewref.element.nativeElement), true); // show loading progress icon
            this.fourD.call4DRESTMethod('MGSERecalcAllRecommendations', body, {responseType:'text'})
                .subscribe(result => {
                       kendo.ui.progress($(this.viewref.element.nativeElement), false); // hide loading progress icon
                }, error => { console.log(error); alert('Error:' + error); });
        
    }
}
