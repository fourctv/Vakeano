import { Component, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

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
            width:1000, height:810
        };

    public currentRecord: FeaturesEx;

    public onNetFlixURL:string = '';
    public onAmazonURL:string = '';
    public onHBOGOURL:string = '';
    public onHBONowURL:string = '';
    public onFandangoURL:string = '';

    private jwItem:any;

    constructor(private http:Http) {
        super();
    }

    ngAfterViewInit() {
        this.dialog.setTitle('Program Details: '+this.currentRecord.IMDBTitle);
        if (this.currentRecord.JustWatchItem && this.currentRecord.JustWatchItem != '') {
            this.jwItem = JSON.parse(this.currentRecord.JustWatchItem)
            this.analyzeJW();
        }
    }

    public queryJustWatch() {
        if (this.currentRecord.IMDBTitle && this.currentRecord.IMDBTitle != '' && this.currentRecord.ProdYear && this.currentRecord.ProdYear > 0) {
            const contentHeaders = new Headers();
            contentHeaders.append('Accept', 'text/json;text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8'); // need all this crap for 4D V15!!
            let body = {query:this.currentRecord.IMDBTitle.replace(' ','+')};
            let jwURL = 'https://apis.justwatch.com/content/titles/en_US/popular?body='+JSON.stringify(body);

            this.http.get(jwURL, { headers: contentHeaders })
            .subscribe(
                response => {
                    this.jwItem = null;
                    let resultJSON = response.json();
                    if (resultJSON.items.length === 1) {
                        this.jwItem = resultJSON.items[0];
                        this.currentRecord.JustWatchID = resultJSON.items[0].object_id;
                    } else {
                        for (var index = 0; index < resultJSON.items.length; index++) {
                            var item = resultJSON.items[index];
                            if (item.title === this.currentRecord.IMDBTitle && item.original_release_year.toString() === this.currentRecord.ProdYear.toString()) {
                                this.jwItem = item;
                                break;
                            } 
                        }
                    }

                    if (this.jwItem) {
                        //console.log(this.jwItem);
                        this.currentRecord.JustWatchID = this.jwItem.id.toString();
                        this.analyzeJW();
                    } else {
                        alert('not found');
                    }
                },
                error => {alert('Error:'+error)}
            )

        }
    }

    public showJWPoster(e) {
        if (this.jwItem && this.jwItem.poster != '') {
            let xOffset = 30;
            let yOffset = 180;

            $('body').append('<img id="jwpreview" src="https://www.justwatch.com/images'+this.jwItem.poster.replace('{profile}','s332')+'" alt="Image preview" />');
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
        if (this.jwItem) window.open('https://www.justwatch.com'+this.jwItem.full_path,'_blank');
    }
    
    public showNetflix() {
        if (this.onNetFlixURL) window.open(this.onNetFlixURL,'_blank');
    }

    public showAmazon() {
        if (this.onAmazonURL) window.open(this.onAmazonURL,'_blank');
    }

    public showHBOGO() {
        if (this.onHBOGOURL) window.open(this.onHBOGOURL,'_blank');
    }

    public showHBONow() {
        if (this.onHBONowURL) window.open(this.onHBONowURL,'_blank');
    }

    public showFandango() {
        if (this.onFandangoURL) window.open(this.onFandangoURL,'_blank');
    }

    private analyzeJW() {
        if (this.jwItem) {
            if (this.jwItem.offers && this.jwItem.offers.length > 0) {
                this.jwItem.offers.forEach(element => {
                    if (element.monetization_type === 'flatrate' || element.monetization_type === 'cinema') {
                        // get the web url
                        if (element.urls) {
                            let url = element.urls['standard_web'];
                            switch (element.provider_id) {
                                case 8:
                                    this.onNetFlixURL = url;
                                    break;
                            
                                case 7:
                                    this.onAmazonURL = url;
                                    break;
                            
                                case 27:
                                    this.onHBONowURL = url;
                                    break;
                            
                                case 31:
                                    this.onHBOGOURL = url;
                                    break;
                            
                                case 60:
                                    this.onFandangoURL = url;
                                    break;
                            
                                default:
                                    break;
                            }
                        }

                    }
                });
            }
        }
    }
}
