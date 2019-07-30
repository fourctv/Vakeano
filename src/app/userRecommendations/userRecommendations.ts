import { Component, Input, AfterViewInit } from '@angular/core';

import { FourDInterface } from 'js44d';
import { FourDCollection } from 'js44d';

import { ViewerContent, ViewerContentEx, Features, TasteProfiles } from '../moviegenome/index';
import { JustWatchItem, TMDB } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'user-recommendations',
    templateUrl: 'userRecommendations.html',
    styleUrls: ['userRecommendations.css']
})

export class UserRecommendations implements AfterViewInit {

    @Input() currentUser: number = FourDInterface.currentUserID;
    @Input() currentRecommendation: string = 'your viewer/rating profile';
    @Input() userIsAdmin: boolean = false;

    @Input() controlList: FourDCollection = new FourDCollection();

    @Input() curatedProfiles: Array<any> = [];
    @Input() profileID: number;
    @Input() profileName: string = '';
    @Input() profileUser: number;
    @Input() showCuratedList: Boolean = false;

    @Input() public recommendationType = 'Features';
    public serverURL = FourDInterface.fourDUrl;

    constructor(private fourD: FourDInterface, private justWatch: JustWatchItem, private tmdb: TMDB) {
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngAfterViewInit() {
        this.userIsAdmin = FourDInterface.authentication.options.isAdmin === 'true';
        this.controlList.model = ViewerContentEx;
        this.refreshList(this.recommendationType);
        this.loadCuratedProfileList();
    }

    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(viewerContent: ViewerContentEx, stars: number) {
        let type = 'Feature';
        let contentID = viewerContent.FeatureID;
        if (viewerContent.SeriesID > 0) {
            type = 'Series';
            contentID = viewerContent.SeriesID;
        } else if (viewerContent.SeasonID > 0) {
            type = 'Season';
            contentID = viewerContent.SeasonID;
        }
        let body = {
            type: type,
            contentID: contentID,
            rating: stars,
            viewer: viewerContent.UserID
        };
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
            .subscribe(response => {
                if (response.result === 'OK') {
                    let list: Array<ViewerContentEx> = this.controlList.models;
                    this.controlList.models = list.filter((item) => { return item.RecordID !== viewerContent.RecordID; });
                } else alert('Error:' + response.message);
            }, error => { console.log(error); alert('Error:' + error); });

    }

    /**
     * replace new line chars by a Html line breadk
     */
    cleanUpText(text: string): string {
        return text.replace(/\n/g, '<br/>');
    }

    /**
     * Refresh Recommendations list
     */
    refreshList(type:string='Features') {
        this.currentRecommendation = 'your viewer/rating profile';
        this.recommendationType = type;
        let query = { custom: 'MGSEFilterViewerContent', tableName: 'ViewerContent', filter: 'recommend', userID: FourDInterface.currentUserID, type:type };
        if (this.profileID && this.profileID > 0) {
            query['profileID'] = this.profileID;
            query.userID = this.profileUser;
            this.currentRecommendation = this.profileName;
        }

        //this.log.debug('query:'+queryType);
        this.controlList.getRecords(query,null,0, -1, '', '<' + ViewerContent.kMGPVR);


    }

    /**
     * let user select a curated profile
     */
    loadCuratedProfileList() {
        if (this.curatedProfiles.length === 0) {
            var profs: FourDCollection = new FourDCollection();
            profs.model = TasteProfiles;
            profs.getRecords({ query: [TasteProfiles.kOrigin + ';=;Curator'] }, [TasteProfiles.kProfileID, TasteProfiles.kName])
                .then(recs => {
                    this.curatedProfiles = [{ ProfileID: 0, Name: 'Your Viewer Profile' }].concat(profs.models);
                    this.showCuratedList = true;
                });
        }
    }

    /**
     * Show Curated Profile Recommendations
     */
    selectCurated(item) {
        this.profileID = item.ProfileID;
        this.profileName = item.Name;
        this.showCuratedList = false;
        this.refreshList(this.recommendationType);
    }

    /**
     * Show JW page for a given Feature
     *
     * @param jwID selected feature JW ID
     */
    public showJustWatch(viewerContent:ViewerContentEx) {
        if (viewerContent.JustWatchID && viewerContent.JustWatchID != '') {
            this.justWatch.getJustWatchItem(viewerContent.JustWatchID,(viewerContent.FeatureID > 0)?'movie':'show')
                .then(jw => {
                    if (this.justWatch.movieURL != '') window.open(this.justWatch.movieURL, '_blank');
                });
        }
    }

    /**
     * Show JW page for a given Feature
     *
     * @param jwID selected feature JW ID
     */
    public showMovieSite(viewerContent:ViewerContentEx) {
        console.log("show:"+viewerContent.TMDBID)
        if (viewerContent.TMDBID && viewerContent.TMDBID != '') {
            this.tmdb.getTMDBDetails(viewerContent.TMDBID,(viewerContent.FeatureID > 0)?'movie':'tv')
                .then(jw => {
                    if (this.tmdb.movieURL != '') window.open(this.tmdb.movieURL, '_blank');
                });
        }
    }

    selectType(type) {
        this.recommendationType = type;
        this.refreshList(type);
    }

}
