import { Component, AfterViewInit, ViewChild, ElementRef,Input } from '@angular/core';

import { FourDInterface, MD5 } from '../js44D/js44D/JSFourDInterface';
import { ModalConfig } from '../js44D/angular2-modal/models/ModalConfig';
import { RecordEditWindow } from '../js44D/containers/recordEditWindow';

import { ShellUsersEx, Location } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'modal-content',
    templateUrl: 'userInfo.dialog.html'
})

export class UserInfoDialog extends RecordEditWindow implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
        size: 'lg',
        actions: ['Maximize', 'Minimize', 'Close'], position: { top: 100, left: 100 }, selfCentered: true,
        title: 'User Details',
        isResizable: false,
        width: 660, height: 260
    };

    @Input() get userPassword():string {return '*'}
    set userPassword(v:string) {
        if (this.currentRecord) {
            this.currentRecord.Password = MD5.md5(v);
        }
    }
    @Input() public currentRecord: ShellUsersEx;
    @Input() public locations: Array<string> = [];
    private locationIDs: Array<number> = [];


    constructor(private elementRef: ElementRef) { super(); }

    ngAfterViewInit() {
        let location = new Location();
        location.getRecords({query:['all']})
        .then(recs => {
                   recs.models.forEach((rec:Location) => {
                        this.locations.push(rec.LocationName);
                        this.locationIDs.push(rec.RecordID);
                    });
            
        })
        if (this.currentRecord.isRecordLoaded()) {
            this.dialog.setTitle('Details for User: ' + this.currentRecord.UserName);
        } else {
            this.dialog.setTitle('New User');
        }
    }

    isItemSelected(item: string): string {
        return (item === this.currentRecord.LocationName) ? 'selected' : '';
    }

    changeLocation(event) {
        let i = this.locations.findIndex(v => {return v === event.target.value})
        if (i >= 0) this.currentRecord.LocationID = this.locationIDs[i];
    }
}
