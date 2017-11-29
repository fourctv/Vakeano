import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NgModel } from '@angular/forms';

import { FourDInterface } from 'js44d';
import { Modal, ModalDialogInstance } from 'js44d';
import { DataGrid } from 'js44d';

import { ShellUsersEx, Location } from '../moviegenome/index';

import { UserInfoDialog } from './userInfo.dialog';


@Component({
    selector: 'user-list',
    providers: [Modal, NgModel],
    template: `
    <web-application>
        <record-list [editWindow]="editWindow" [dialogInstance]="dialog">
            <query-band [enableSort]="true" [enableQBE]="true" [enableButtonBar]="true" [enableAddRecord]="true" [enableDeleteRecord]="true" [cascadeDeleteRecord]="true">
                <queryband class="form-group">
                    <user-queryband #customQueryBand class="form-group"></user-queryband>
                </queryband>
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

export class UserListApp {  
      
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
    public editWindow = UserInfoDialog;
    
    //
    // Declare Datagrid properties
    //
    public model = ShellUsersEx; // the record datamodel to use 
    // the columns for the datagrid
    public columnDefs = [
        { title: 'User ID', field: 'ID', width:80},
        { title: 'User Name', field: 'UserName', width:150 },
        { title: 'First Name', field: 'FirstName', width:150 },
        { title: 'Last Name', field: 'LastName', width:150},
        { title: 'is Admin?', field: 'isAdmin', width:80 },
        { title: 'Location', field: 'LocationName', width:150, filterable: { multi: true} }
    ];


    //
    // We need access to a Modal dialog component, to open an associated Record Edit Form 
    //
    constructor(private modal: Modal, private viewref:ViewContainerRef, private fourD:FourDInterface) {
    }

}
