import { Component, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RecordEditWindow } from '../js44D/containers/recordEditWindow';
import { ModalConfig } from '../js44D/angular2-modal/models/ModalConfig';

import { FeaturesEx } from '../moviegenome/index';
import { JustWatchItem } from '../moviegenome/index';


@Component({
    moduleId: module.id,
    selector: 'modal-content',
    templateUrl: 'featureInfoDialog.html'
})

export class FeatureInfoDialog extends RecordEditWindow implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
        actions: ['Maximize', 'Minimize', 'Close'], position: { top: 50, left: 50 }, selfCentered: true,
        title: 'Program Details',
        isResizable: false,
        width: 1000, height: 810
    };

    public currentRecord: FeaturesEx;

    public onNetFlixURL: string = '';
    public onAmazonURL: string = '';
    public onHBOGOURL: string = '';
    public onHBONowURL: string = '';
    public onFandangoURL: string = '';

    constructor(private justWatch:JustWatchItem, private http: Http) {
        super();
    }

    ngAfterViewInit() {
        this.dialog.setTitle('Program Details: ' + this.currentRecord.IMDBTitle);
        if (this.currentRecord.JustWatchID && this.currentRecord.JustWatchID != '') {
            this.justWatch.getJustWatchItem(this.currentRecord.JustWatchID)
            .then(jw => {
                this.analyzeJW();
            })
        }
    }

    public queryJustWatch() {
        if (this.currentRecord.IMDBTitle && this.currentRecord.IMDBTitle != '' && this.currentRecord.ProdYear && this.currentRecord.ProdYear > 0) {
            this.justWatch.queryJW(this.currentRecord.IMDBTitle, this.currentRecord.ProdYear)
                .then(jw => {
                     if (this.justWatch.jwItem) {
                        //console.log(this.jwItem);
                        this.currentRecord.JustWatchID = this.justWatch.justWatchID.toString();
                        this.currentRecord.PosterURL = this.justWatch.posterURL;
                        this.analyzeJW();
                    } else {
                        alert('not found');
                    }
                })
                .catch(err => { alert('Error:' + err) })
        }
    }

    public showJWPoster(e) {
        if (this.justWatch.posterURL != '') {
            let xOffset = 30;
            let yOffset = 180;

            $('body').append('<img id="jwpreview" src="' + this.justWatch.posterURL + '" alt="Image preview" />');
            $('#jwpreview').css({
                'top': (e.pageY - yOffset) + 'px',
                'left': (e.pageX + xOffset) + 'px',
                'display': 'block',
                'width': '332px',
                'position': 'relative',
                'z-index': 25000
            });

        }
    }

    public hideJWPoster(e) {
        //console.log('leave', e);
        $('#jwpreview').remove();
    }

    public showJW() {
        if (this.justWatch && this.justWatch.movieURL != '') window.open(this.justWatch.movieURL, '_blank');
    }

    public showNetflix() {
        if (this.onNetFlixURL) window.open(this.onNetFlixURL, '_blank');
    }

    public showAmazon() {
        if (this.onAmazonURL) window.open(this.onAmazonURL, '_blank');
    }

    public showHBOGO() {
        if (this.onHBOGOURL) window.open(this.onHBOGOURL, '_blank');
    }

    public showHBONow() {
        if (this.onHBONowURL) window.open(this.onHBONowURL, '_blank');
    }

    public showFandango() {
        if (this.onFandangoURL) window.open(this.onFandangoURL, '_blank');
    }

    private analyzeJW() {
        if (this.justWatch) {
            this.onNetFlixURL = this.justWatch.getServiceURL(JustWatchItem.NETFLIX);
            this.onAmazonURL = this.justWatch.getServiceURL(JustWatchItem.AMAZON);
            this.onHBOGOURL = this.justWatch.getServiceURL(JustWatchItem.HBOGO);
            this.onHBONowURL = this.justWatch.getServiceURL(JustWatchItem.HBONOW);
            this.onFandangoURL = this.justWatch.getServiceURL(JustWatchItem.FANDANGO);
        }
    }
}
