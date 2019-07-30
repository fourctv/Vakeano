import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecordEditWindow } from 'js44d';
import { ModalConfig } from 'js44d';
import { ListSelectorDialog } from 'js44d';
import { Tab, Tabs} from 'js44d';

import { SeriesEx } from '../moviegenome/index';
import { JustWatchItem, TMDB } from '../moviegenome/index';
import { SeriesSeasonList } from './seriesSeasonList';


@Component({
    moduleId: module.id,
    selector: "modal-content",
    templateUrl: "seriesInfoDialog.html",
    providers: [ListSelectorDialog]
})
export class SeriesInfoDialog extends RecordEditWindow
    implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
        actions: ["Maximize", "Minimize", "Close"],
        position: { top: 50, left: 50 },
        selfCentered: true,
        title: "Program Details",
        isResizable: false,
        width: 1000,
        height: 600
    };

    public currentRecord: SeriesEx;

    public onNetFlixURL: string = "";
    public onAmazonURL: string = "";
    public onHBOGOURL: string = "";
    public onHBONowURL: string = "";
    public onFandangoURL: string = "";

    @ViewChild(SeriesSeasonList, { static: false }) private seasonList: SeriesSeasonList;
    @ViewChild(Tabs, { static: false }) private tabList: Tabs;
    @ViewChild("seasonList", { static: false }) private seasonListTab: Tab;

    constructor(
        public justWatch: JustWatchItem,
        public tmdb: TMDB,
        private http: HttpClient,
        private selector: ListSelectorDialog
    ) {
        super();
    }

    ngAfterViewInit() {
        this.dialog.setTitle("Series Details: " + this.currentRecord.IMDBTitle);
        if (
            this.currentRecord.JustWatchID &&
            this.currentRecord.JustWatchID != ""
        ) {
            this.justWatch
                .getJustWatchItem(this.currentRecord.JustWatchID, "show")
                .then(jw => {
                    this.analyzeJW();
                });
        }

        if (this.currentRecord.TMDBID && this.currentRecord.TMDBID != "") {
            this.tmdb
                .getTMDBDetails(this.currentRecord.TMDBID, "tv")
                .then(v => {});
        }
    }

    public refreshSeasons() {
        this.seasonList.refreshList();
        this.tabList.selectThisTab(this.seasonListTab);
    }

    public queryTMDB() {
        if (
            this.currentRecord.IMDBTitle &&
            this.currentRecord.IMDBTitle != ""
        ) {
            this.tmdb
                .queryTMDBSeries(
                    this.currentRecord.IMDBTitle,
                    this.currentRecord.ProdYear
                )
                .then(recjw => {
                    if (this.tmdb.tmdbRecord) {
                        this.tmdb
                            .grabTMDBSeriesData(this.currentRecord)
                            .then(() => this.queryJustWatch());
                    } else if (
                        this.tmdb.tmdbList &&
                        this.tmdb.tmdbList.length > 0
                    ) {
                        // we got a list back...let user select
                        let titleList = [];
                        let tipsList = [];
                        this.tmdb.tmdbList.forEach(item => {
                            titleList.push(
                                item.name + " - " + item.first_air_date
                            );
                            tipsList.push(item.overview);
                        });
                        this.selector.title = "Select Series...";
                        this.selector.width = 600;
                        this.selector.show(titleList, tipsList).then(index => {
                            this.tmdb.tmdbRecord = this.tmdb.tmdbList[index];
                            this.tmdb
                                .grabTMDBSeriesData(this.currentRecord)
                                .then(() => this.queryJustWatch());
                        });
                    } else {
                        alert("not found");
                    }
                })
                .catch(err => {
                    alert("Error:" + err);
                });
        }
    }
    public queryJustWatch() {
        if (
            this.currentRecord.IMDBTitle &&
            this.currentRecord.IMDBTitle != "" &&
            this.currentRecord.ProdYear &&
            this.currentRecord.ProdYear > 0
        ) {
            this.justWatch
                .queryJW(
                    this.currentRecord.IMDBTitle,
                    this.currentRecord.ProdYear
                )
                .then(jw => {
                    if (this.justWatch.jwItem) {
                        //console.log(this.jwItem);
                        this.currentRecord.JustWatchID = this.justWatch.justWatchID.toString();
                        //this.currentRecord.PosterURL = this.justWatch.posterURL;
                        this.analyzeJW();
                    } else {
                        alert("not found");
                    }
                })
                .catch(err => {
                    alert("Error:" + err);
                });
        }
    }

    public showPoster(e) {
        if (this.tmdb.posterURL != "") {
            let xOffset = 30;
            let yOffset = 180;

            $("body").append(
                '<img id="jwpreview" src="' +
                    this.tmdb.posterURL +
                    '" alt="Image preview" />'
            );
            $("#jwpreview").css({
                top: e.pageY - yOffset + "px",
                left: e.pageX + xOffset + "px",
                display: "block",
                width: "300px",
                position: "relative",
                "z-index": 25000
            });
        } else if (this.justWatch.posterURL != "") {
            let xOffset = 30;
            let yOffset = 180;

            $("body").append(
                '<img id="jwpreview" src="' +
                    this.justWatch.posterURL +
                    '" alt="Image preview" />'
            );
            $("#jwpreview").css({
                top: e.pageY - yOffset + "px",
                left: e.pageX + xOffset + "px",
                display: "block",
                width: "332px",
                position: "relative",
                "z-index": 25000
            });
        }
    }

    public hidePoster(e) {
        //console.log('leave', e);
        $("#jwpreview").remove();
    }

    public showTMDB() {
        if (this.currentRecord.TMDBID && this.currentRecord.TMDBID != "")
            window.open(
                "https://www.themoviedb.org/tv/" + this.currentRecord.TMDBID,
                "_blank"
            );
    }

    public showMovieSite() {
        if (this.tmdb.movieURL != "") window.open(this.tmdb.movieURL, "_blank");
    }

    public showJW() {
        if (this.justWatch && this.justWatch.movieURL != "")
            window.open(this.justWatch.movieURL, "_blank");
    }

    public showNetflix() {
        if (this.onNetFlixURL) window.open(this.onNetFlixURL, "_blank");
    }

    public showAmazon() {
        if (this.onAmazonURL) window.open(this.onAmazonURL, "_blank");
    }

    public showHBOGO() {
        if (this.onHBOGOURL) window.open(this.onHBOGOURL, "_blank");
    }

    public showHBONow() {
        if (this.onHBONowURL) window.open(this.onHBONowURL, "_blank");
    }

    public showFandango() {
        if (this.onFandangoURL) window.open(this.onFandangoURL, "_blank");
    }

    private analyzeJW() {
        if (this.justWatch) {
            this.onNetFlixURL = this.justWatch.getServiceURL(
                JustWatchItem.NETFLIX
            );
            this.onAmazonURL = this.justWatch.getServiceURL(
                JustWatchItem.AMAZON
            );
            this.onHBOGOURL = this.justWatch.getServiceURL(JustWatchItem.HBOGO);
            this.onHBONowURL = this.justWatch.getServiceURL(
                JustWatchItem.HBONOW
            );
            this.onFandangoURL = this.justWatch.getServiceURL(
                JustWatchItem.FANDANGO
            );
        }
    }
}
