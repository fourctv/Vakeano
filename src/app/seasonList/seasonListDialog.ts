import { Component, ContentChild, ElementRef, ViewContainerRef, AfterContentInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalConfig, Modal, ICustomModalComponent } from 'js44d';

import { SeasonListApp } from './seasonList'

@Component({
    selector: 'season-list-dialog',
    template: '<div></div>',
    providers: [Modal]
})

export class SeasonListDialog implements AfterContentInit {
    constructor(private modal: Modal, public router:Router, private elementRef: ElementRef, private viewRef:ViewContainerRef) {
    }
    
    /**
     * Declare the dialog configuration
     */
    private dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            selfCentered:false,
            position:{top:100,left:100},
            title:'Season',
            width:1200, height:700};
    /**
     * AFter our view gets initialized, subscribe to various events on the Query band and the Grid
     */
    ngAfterContentInit() {
        this.router.navigate(['/blank'], { skipLocationChange: true });
        this.modal.open(SeasonListApp, {}, this.dialogConfig, false, 'seasonList'); // open web app dialog window
    }
}
