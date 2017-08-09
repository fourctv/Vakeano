import { Component, Input, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular";

import * as app from "tns-core-modules/application";
import { openUrl } from "tns-core-modules/utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";

import { FourDInterface } from '../js44D/js44D/JSFourDInterface';
import { JustWatchItem } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'modal-content',
    template: `
    <StackLayout verticalAlignment="center" horizontalAlignment="left" (swipe)="onSwipe($event)">
    
        <GridLayout rows="*,auto" marginTop="5">
            <StackLayout row="0" verticalAlignment="center" horizontalAlignment="center">
                <Image [src]='currentFeature.FullResPosterURL'></Image>
            </StackLayout>

            <GridLayout rows="auto,*,auto,auto" row="0" (longPress)="gotoJustWatch()">
                <StackLayout row="0" verticalAlignment="center" horizontalAlignment="center"  marginTop="35">
                    <Label text="\uf087" class="icon" (tap)="rateThis(3)"></Label>
                </StackLayout>

                <DockLayout columns="auto,*,auto" row="1" verticalAlignment="center" marginLeft="5" marginRight="5">
                    <Label dock="left"  text="\uf137" class="icon" (tap)="close('OK')"></Label>
                    <Label dock="right"  text="\uf004" class="icon" (tap)="rateThis(5)" horizontalAlignment="right"></Label>
                </DockLayout>

                <StackLayout row="2" verticalAlignment="center" horizontalAlignment="center" marginBottom="5">
                    <Label text="\uf088" class="icon" (tap)="rateThis(1)"></Label>
                </StackLayout>

                <DockLayout columns="auto,*,auto" row="3" verticalAlignment="center" marginBottom="10">
                    <Label dock="left" [text]="currentFeature.IMDBTitle + ' (' + currentFeatureScore() + ')'" textWrap="true" color="white"></Label>
                    <Image dock="right" *ngIf="onNetflixURL != ''" src="~/assets/icons/netflix.jpeg" width="32" height="32" horizontalAlignment="right" marginRight="5"  (tap)="gotoNetFlix()"></Image>                    
                </DockLayout>

            </GridLayout>

        </GridLayout>

     </StackLayout>
    `
})
export class FeatureRecommendation implements OnInit {
   @Input() public currentFeature:any;
   
    @Input() onNetflixURL:string = '';

    stars:string = "\uF006";

    constructor(private fourD:FourDInterface, private justWatch:JustWatchItem, private params: ModalDialogParams) {
        this.currentFeature = params.context.feature;
    }

    ngOnInit() {
        if (this.currentFeature.JustWatchID != '') {
            this.justWatch.getJustWatchItem(this.currentFeature.JustWatchID)
            .then(jw => {
                this.onNetflixURL = (app.ios)?this.justWatch.getServiceURL(JustWatchItem.NETFLIX,'iOS'):this.justWatch.getServiceURL(JustWatchItem.NETFLIX,'Android');
            })
        } else {
            this.justWatch.jwItem = null;
            this.onNetflixURL = '';
        }
    }


    public close(res: string) {
        this.params.closeCallback(res);
    }

    //
    // go to Netflix page if title is available on Netflix
    //
    public gotoJustWatch() {
        //openUrl("http://www.imdb.com/title/"+this.currentFeature.IMDBID);
        if (this.currentFeature.JustWatchID && this.currentFeature.JustWatchID != '') {
            this.justWatch.getJustWatchItem(this.currentFeature.JustWatchID)
            .then (jw => {
                if (this.justWatch.movieURL != '') openUrl(this.justWatch.movieURL);
            });
        }
    }

    //
    // go to Netflix page if title is available on Netflix
    //
    public gotoNetFlix() {
        console.log('flix URL:'+this.onNetflixURL);
        if (this.onNetflixURL != '') openUrl(this.onNetflixURL);
    }

    public rateThis(stars:number) {
        console.log('stars:'+stars);
        let body = {type: 'Feature', 
                    contentID: this.currentFeature.FeatureID, 
                    rating: stars, 
                    viewer: this.currentFeature.UserID};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                this.close('OK');
            } else alert('Error:'+response.message);
        }, error => {console.log(error);alert('Error:'+error);});
    }

    //
    // handle user swipe on a row
    //
    onSwipe(event:SwipeGestureEventData) {
        switch (event.direction) {
            case SwipeDirection.left:
                this.close('OK');
                break;
        
            case SwipeDirection.right:
                this.rateThis(5);
                break;

            case SwipeDirection.down:
                this.rateThis(1);
                break;

            case SwipeDirection.up:
                this.rateThis(4);
                break;
       }
        
    }

    currentFeatureScore():string {
        let score = (((this.currentFeature.MGPEI + this.currentFeature.MGPAI) * this.currentFeature.MGCCI)/2 + this.currentFeature.MGEQI+this.currentFeature.MGNQI).toFixed(2);
        return score;
    }


}