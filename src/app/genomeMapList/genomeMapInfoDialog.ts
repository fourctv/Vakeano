import { Component, AfterViewInit } from '@angular/core';

import { RecordEditWindow } from 'js44d/ui';
import { ModalConfig } from 'js44d/ui';
import { GenomeMap } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'modal-content',
    templateUrl : 'genomeMapInfoDialog.html' 
})

export class GenomeMapInfoDialog extends RecordEditWindow implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
            actions:['Maximize', 'Minimize', 'Close'], position: {top:100, left:100},selfCentered:true,
            title:'Gene Details',
            isResizable:false,
            width:1000, height:510
        };
    
    currentRecord: GenomeMap;
    

    ngAfterViewInit() {
        this.dialog.setTitle('Gene Details: '+this.currentRecord.GeneName);
    }


}
