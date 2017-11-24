import { Component, ContentChild, ElementRef, ViewContainerRef, AfterContentInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalConfig, Modal, ICustomModalComponent } from 'js44d';

import { TheaterManagementApp } from './theaterManagement.component'

@Component({
    selector: 'user-list-dialog',
    template: '<div></div>',
    providers: [Modal]
})

export class TheaterManagementDialog implements AfterContentInit {
    constructor(private modal: Modal, public router:Router, private elementRef: ElementRef, private viewRef:ViewContainerRef) {
    }
    
    /**
     * Declare the dialog configuration
     */
    private dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            selfCentered:true,
            title:'Location Management',
            width:1200, height:540};
    /**
     * AFter our view gets initialized, subscribe to various events on the Query band and the Grid
     */
    ngAfterContentInit() {
        this.router.navigate(['/blank'], { skipLocationChange: true });
        this.modal.open(TheaterManagementApp, {}, this.dialogConfig, false, 'userList'); // open web app dialog window
    }
}
