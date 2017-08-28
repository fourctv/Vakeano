import { Component, ContentChild, ElementRef, ViewContainerRef, AfterContentInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalConfig } from '../js44D/angular2-modal/models/ModalConfig';
import { Modal } from '../js44D/angular2-modal/providers/Modal';
import { ICustomModalComponent } from '../js44D/angular2-modal/models/ICustomModalComponent';

import { UserRating } from './userRating'

@Component({
    selector: 'ratings-dialog',
    template: '<div></div>',
    providers: [Modal]
})

export class UserRatingAppDialog implements AfterContentInit {
    constructor(private modal: Modal, public router:Router, private elementRef: ElementRef, private viewRef:ViewContainerRef) {
    }
    
    /**
     * Declare the dialog configuration
     */
    private dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            selfCentered:false,
            position: {top:70, left:70},
            title:'User Rating',
            width:1100, height:800};
    /**
     * AFter our view gets initialized, subscribe to various events on the Query band and the Grid
     */
    ngAfterContentInit() {
        this.router.navigate(['/blank'], { skipLocationChange: true });
        this.modal.open(UserRating, {}, this.dialogConfig, false, 'userRating'); // open web app dialog window
    }
}
