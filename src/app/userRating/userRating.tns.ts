import { Component, Input, OnInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';

import { openUrl } from "tns-core-modules/utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular";

import { FeatureRatingPage} from './featureRatingPage';

import { FourDInterface } from '../js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../js44D/js44D/JSFourDCollection';

import { Features } from '../moviegenome/index';
import { JustWatchItem } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'userrating',
    templateUrl: 'userRating.html' ,
    styles: [`
        .icon {
        font-family: 'FontAwesome';
        font-size: 24;
        }
   `],
    changeDetection: ChangeDetectionStrategy.Default
})

export class UserRating implements OnInit {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
    
    @Input() controlList:FourDCollection = new FourDCollection();
    @Input() isLoading = false;


    constructor(private fourD:FourDInterface, private justWatch:JustWatchItem, private modalService: ModalDialogService, private vref:ViewContainerRef) {
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.isLoading = true;
        this.controlList.model = Features;
        this.refreshList();
    }


    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(feature:Features, stars:number) {
        let body = {type: 'Feature', 
                    contentID: feature.FeatureId, 
                    rating: stars, 
                    viewer: this.currentUser};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(response => {
            if (response.result === 'OK') {
                this.removeFeature(feature);
            } else alert('Error:'+response.message);
        }, error => {console.log(error);alert('Error:'+error);});
           
    }
    
    //
    // handle user swipe on a row
    //
    onSwipe(event:SwipeGestureEventData, item:Features) {
      console.log('swipe:'+event.direction+', item:'+item.IMDBTitle);
        
        switch (event.direction) {
            case SwipeDirection.left:
                this.rateThis(item, 1);
                break;
        
            case SwipeDirection.right:
                let options: any = {
                        context: { feature: item },
                        fullscreen: true,
                        viewContainerRef: this.vref
                    };

                this.modalService.showModal(FeatureRatingPage, options)
                    .then (() => {
                        this.removeFeature(item);
                    });
                break;

       }
       
    }

    /**
     * remove feature from the list
     */
    removeFeature(feature:Features) {
        let list:Array<Features> = this.controlList.models;
        this.controlList.models = list.filter((item) => {return item.FeatureId !== feature.FeatureId;});
    }

 
    refreshList() {
        this.controlList.getRecords(<any>{custom:"MGSEFilterViewerContent", tableName:"Features", filter:"control", userID:this.currentUser},
            [Features.kIMDBID, Features.kIMDBTitle,Features.kPosterURL, Features.kFeatureId, Features.kJustWatchID,
            Features.kProdYear, Features.kFeatureCast, Features.kDirectorsList])
            .then(recs => {
                console.log('length:'+recs.length);
                if (recs.length > 0) {
                     this.isLoading = false;
                 }
             });
    }


    public gotoJustWatch(feature:Features) {
        //openUrl("http://www.imdb.com/title/"+this.currentFeature.IMDBID);
        if (feature.JustWatchID && feature.JustWatchID != '') {
            this.justWatch.getJustWatchItem(feature.JustWatchID)
            .then (jw => {
                if (this.justWatch.movieURL != '') openUrl(this.justWatch.movieURL);
            });
        }
    }

 
}
