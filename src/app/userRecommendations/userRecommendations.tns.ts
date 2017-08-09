import { Component, Input, OnInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';

import { openUrl } from "tns-core-modules/utils/utils";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular";

import { FeatureRecommendation} from './featureRecommendation';

import { FourDInterface } from '../js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../js44D/js44D/JSFourDCollection';

import { ViewerContent, ViewerContentEx, Features, TasteProfiles } from '../moviegenome/index';
import { JustWatchItem } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'userrecommendations',
    templateUrl : 'userRecommendations.html' ,
    styleUrls : ['userRecommendations.css'],
    providers: [ModalDialogService],
    changeDetection: ChangeDetectionStrategy.Default
})

export class UserRecommendations implements OnInit {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
    @Input() currentRecommendation:string = '';

    @Input() profileID:number;
    
    @Input() controlList:FourDCollection = new FourDCollection();
    @Input() currentFeature:any;
    isLoading = false;



    constructor(private fourD:FourDInterface, private justWatch:JustWatchItem, private modalService: ModalDialogService, private vref:ViewContainerRef) {
       
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.isLoading = true;
        this.controlList.model = ViewerContentEx;
        this.refreshList();
    }


    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(feature:ViewerContentEx, stars:number) {
        let body = {type: 'Feature', 
                    contentID: feature.FeatureID, 
                    rating: stars, 
                    viewer: feature.UserID};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                let list:Array<ViewerContentEx> = this.controlList.models;
                this.controlList.models = list.filter((item) => {return item.RecordID !== feature.RecordID;});
                this.currentFeature = this.controlList.models[0];
            } else alert('Error:'+response.message);
        }, error => {console.log(error);alert('Error:'+error);});
           
    }
    
  
    refreshList() {
        let query={custom:"MGSEFilterViewerContent", tableName:"ViewerContent", filter:"recommend"};
         if (this.profileID && this.profileID > 0) {
            query['profileId']=this.profileID;
        } else {
            query['userID']=FourDInterface.currentUserID;
        }
        //console.log('query:'+queryType);
        this.controlList.getRecords(query,
                                    [ViewerContent.kRecordID, ViewerContent.kFeatureID, ViewerContent.kUserID,
                                    ViewerContent.kMGPEI, ViewerContent.kMGPAI, ViewerContent.kMGCCI, ViewerContent.kMGEQI, ViewerContent.kMGNQI,
                                    Features.kIMDBID, Features.kIMDBTitle,Features.kPosterURL,Features.kJustWatchID, 
                                    Features.kProdYear, Features.kFeatureCast, Features.kDirectorsList,
                                    TasteProfiles.kDescription],
                                    0, -1, '','<'+ViewerContent.kMGPVR)
            .then(recs => {
                //console.log('length:'+recs.length);
                if (recs.length > 0) {
                    this.currentRecommendation = 'Recommended for you based on: '+ (<any>recs[0]).Description;
                    this.isLoading = false;
                 }
             });
    }

    //
    // handle user tap on a title: show details
    //
    onItemTap(event) {
        this.currentFeature = this.controlList.models[event.index];
        console.log('tap:'+this.currentFeature.IMDBTitle);
        let options: any = {
                context: { feature: this.currentFeature },
                fullscreen: true,
                viewContainerRef: this.vref
            };

        this.modalService.showModal(FeatureRecommendation, options)
            .then (() => {
                this.refreshList();
            });

    }


    public showJustWatch(jwID) {
        if (jwID && jwID != '') {
            this.justWatch.getJustWatchItem(jwID)
            .then (jw => {
                if (this.justWatch.movieURL != '') openUrl(this.justWatch.movieURL);
            });
        }
    }
}
