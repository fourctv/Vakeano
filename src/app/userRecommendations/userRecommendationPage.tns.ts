import { Component, Input, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import { RouterExtensions } from 'nativescript-angular';

import * as app from "tns-core-modules/application";
import { openUrl } from "tns-core-modules/utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";

import { FourDInterface } from '../js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../js44D/js44D/JSFourDCollection';

import { ViewerContent, ViewerContentEx, Features } from '../moviegenome/index';
import { JustWatchItem } from '../moviegenome/index';


@Component({
    moduleId: module.id,
    selector: 'userrecommendation',
    templateUrl: 'userRecommendationPage.html',
    changeDetection: ChangeDetectionStrategy.Default
})

export class UserRecommendationPage implements OnInit {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
 
    @Input() profileID:number;
    
    @Input() controlList:FourDCollection = new FourDCollection();
    @Input() currentFeature:ViewerContentEx = new ViewerContentEx();
    @Input() isLoading = false;
    @Input() isComplete = false;

    @Input() onNetflixURL:string = '';
    @Input() onAmazonURL: string = '';
    @Input() onHBOGOURL: string = '';
    @Input() onHBONowURL: string = '';
    @Input() onFandangoURL: string = '';

    // fontawesome icons
    @Input() thumbsUp:string = "\uf164";
    @Input() arrow:string = '\uf137';
    @Input() loveIt:string = '\uf004';
    @Input() thumbsDown:string = '\uf165';

    private currentFeatureIndex:number = 0;

    private swipeCount:number = 0;
    constructor(private fourD:FourDInterface, private justWatch:JustWatchItem, private router:RouterExtensions, private route: ActivatedRoute) {
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        console.log('rec:'+JSON.stringify(this.route.params));
        this.route.params.forEach(param => {
            if (param['profileID']) {
                console.log('profile:'+param['profileID']);
                this.profileID = + param['profileID'];
            } ;})
 
        this.isLoading = true;
        this.controlList.model = ViewerContentEx;
        this.recommendationList();
    }


    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(stars:number) {
        let body = {type: 'Feature', 
                    contentID: this.currentFeature.FeatureID, 
                    rating: stars, 
                    viewer: FourDInterface.currentUserID};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                this.nextFeature();
            } else alert('Error:'+response.message);
        }, error => {console.log(error);alert('Error:'+error);});
           
    }

 
    recommendationList() {
        let query={custom:"MGSEFilterViewerContent", tableName:"ViewerContent", filter:"recommend", userID:FourDInterface.currentUserID};
         if (this.profileID && this.profileID > 0) {
            query['profileID']=this.profileID;
        }
        console.log('query:'+JSON.stringify(query));
        this.controlList.getRecords(query,
                                    [ViewerContent.kRecordID, ViewerContent.kFeatureID, ViewerContent.kUserID,
                                    ViewerContent.kMGPEI, ViewerContent.kMGPAI, ViewerContent.kMGCCI, ViewerContent.kMGEQI, ViewerContent.kMGNQI,
                                    Features.kIMDBID, Features.kIMDBTitle,Features.kPosterURL,Features.kJustWatchID, 
                                    Features.kProdYear, Features.kFeatureCast, Features.kDirectorsList],
                                    0, -1, '','<'+ViewerContent.kMGPVR)
            .then(recs => {
                //console.log('length:'+recs.length);
                if (recs.length > 0) {
                    this.currentFeature = <ViewerContentEx>recs[0];
                    this.isLoading = false;
                    this.isComplete = false;
                    this.loadJustWatchItem(); // grab JW data for current feature
                    //console.log('feature:',this.currentFeature.IMDBTitle);
                 }
             }).catch(err => {console.log('err:',err)});
    }


    //
    // load JustWatch info on the current title, so we can get availability info
    //
    loadJustWatchItem() {
        if (this.currentFeature.JustWatchID != '') {
            this.justWatch.getJustWatchItem(this.currentFeature.JustWatchID)
            .then(jw => {
                this.onNetflixURL = (app.ios)?this.justWatch.getServiceURL(JustWatchItem.NETFLIX,'iOS'):this.justWatch.getServiceURL(JustWatchItem.NETFLIX,'Android');
                this.onAmazonURL = (app.ios)?this.justWatch.getServiceURL(JustWatchItem.AMAZON,'iOS'):this.justWatch.getServiceURL(JustWatchItem.AMAZON,'Android');
                this.onHBOGOURL = (app.ios)?this.justWatch.getServiceURL(JustWatchItem.HBOGO,'iOS'):this.justWatch.getServiceURL(JustWatchItem.HBOGO,'Android');
                this.onHBONowURL = (app.ios)?this.justWatch.getServiceURL(JustWatchItem.HBONOW,'iOS'):this.justWatch.getServiceURL(JustWatchItem.HBONOW,'Android');
                this.onFandangoURL = (app.ios)?this.justWatch.getServiceURL(JustWatchItem.FANDANGO,'iOS'):this.justWatch.getServiceURL(JustWatchItem.FANDANGO,'Android');
            })
        } else {
            this.justWatch.jwItem = null;
            this.onNetflixURL = '';
            this.onAmazonURL = '';
            this.onHBOGOURL = '';
            this.onHBONowURL = '';
            this.onFandangoURL = '';
        }
    }

    //
    // go to Just Watch page for this title
    //
    gotoJustWatch() {
        //openUrl("http://www.imdb.com/title/"+this.currentFeature.IMDBID);
        if (this.currentFeature.JustWatchID && this.currentFeature.JustWatchID != '') {
            this.justWatch.getJustWatchItem(this.currentFeature.JustWatchID)
            .then (jw => {
                if (this.justWatch.movieURL != '') openUrl(this.justWatch.movieURL);
            });
        }
    }

    //
    // go to Streaming service page if title is available on that service
    //
    gotoService(service:string) {
        switch (service) {
            case 'Netflix':
                if (this.onNetflixURL != '') openUrl(this.onNetflixURL);
                break;
        
            case 'Amazon':
                if (this.onAmazonURL != '') openUrl(this.onAmazonURL);
                break;
        
            case 'HBOGO':
                if (this.onHBOGOURL != '') openUrl(this.onHBOGOURL);
                break;
        
            case 'HBONow':
                if (this.onHBONowURL != '') openUrl(this.onHBONowURL);
                break;
        
            case 'Fandango':
                if (this.onFandangoURL != '') openUrl(this.onFandangoURL);
                break;
        }
    }

    //
    // handle user swipe on a title
    //
    onSwipe(event:SwipeGestureEventData) {
        console.log('swipe:'+(++this.swipeCount));
        switch (event.direction) {
            case SwipeDirection.left:
                this.nextFeature();
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

    nextFeature() {
        if (++this.currentFeatureIndex < this.controlList.models.length) {
            this.currentFeature = this.controlList.models[this.currentFeatureIndex];
            this.loadJustWatchItem(); // grab JW data for current feature
        } else {
            this.isComplete = true; // we are done with this list...
        }
     }

    currentFeatureScore():string {
        let score = (((<number>(this.currentFeature.MGPEI) + <number>(this.currentFeature.MGPAI)) * <number>this.currentFeature.MGCCI)/2 + <number>this.currentFeature.MGEQI + <number>this.currentFeature.MGNQI).toFixed(2);
        return score;
    }

}
