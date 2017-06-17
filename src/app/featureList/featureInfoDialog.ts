import { Component, AfterViewInit } from '@angular/core';

import { RecordEditWindow } from '../js44D/containers/recordEditWindow';
import { ModalConfig } from '../js44D/angular2-modal/models/ModalConfig';

import {FeaturesEx} from '../moviegenome/index';


@Component({
    moduleId: module.id,
    selector: 'modal-content',
    templateUrl : 'featureInfoDialog.html'
})

export class FeatureInfoDialog extends RecordEditWindow implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
            actions:['Maximize', 'Minimize', 'Close'], position: {top:50, left:50},selfCentered:true,
            title:'Program Details',
            isResizable:false,
            width:1000, height:640
        };

     currentRecord: FeaturesEx;


    ngAfterViewInit() {
        this.dialog.setTitle('Program Details: '+this.currentRecord.IMDBTitle);
    }

}
