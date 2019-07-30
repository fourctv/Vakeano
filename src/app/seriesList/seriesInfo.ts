import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SeriesEx, Seasons, Series } from '../moviegenome/index';
import { JustWatchItem, TMDB } from '../moviegenome/index';
import { SeriesSeasonList } from './seriesSeasonList';
import { FourDInterface } from 'js44d';

@Component({
    moduleId: module.id,
    selector: 'series-info',
    templateUrl: 'seriesInfo.html'
})

export class SeriesInfo {
    @Input() public record: SeriesEx;
    @Input() public tmdb: TMDB;

    @Output() public refreshSeasonList:EventEmitter<any> = new EventEmitter();

    public get showCreateSeasons():boolean {
        return(this.record.isRecordLoaded() && this.tmdb && this.tmdb.tmdbDetails && this.tmdb.tmdbDetails.seasons && this.tmdb.tmdbDetails.seasons.length > 0);
    }

    public generateContentProfile() {
        if (this.record) {
            let saveCallback: string = this.record.fourdSaveCallbackMethod_;
            this.record.fourdSaveCallbackMethod_ = 'CPROGenerateFeatureProfile';
            this.record.updateRecord();
            this.record.fourdSaveCallbackMethod_ = saveCallback;
        }
    }

    public showPoster(e) {
        //console.log('enter',e);
        if (this.record.PosterURL && this.record.PosterURL !== '') {
            let xOffset = 30;
            let yOffset = 180;

            $("body").append(
                '<img id="preview" src="' +
                    FourDInterface.fourDUrl +
                    "/4DAction/REST_GetWebImage?image=" +
                    this.record.PosterURL +
                    '" alt="Image preview" />'
            );
            $('#preview').css({
                'top': (e.pageY - yOffset) + 'px',
                'left': (e.pageX + xOffset) + 'px',
                'display': 'block',
                'width': '400px',
                'position': 'relative',
                'z-index': 25000
            });
        }
    }

    public hidePoster(e) {
        //console.log('leave', e);
        $('#preview').remove();
    }

    /**
     * Create Seasons records for all seasons in this Series
     */
    public createSeasons() {
        if (this.tmdb && this.tmdb.tmdbDetails && this.tmdb.tmdbDetails.seasons && this.tmdb.tmdbDetails.seasons.length > 0) {
            this.seasonCount = this.tmdb.tmdbDetails.seasons.length;
            for (let index = 0; index < this.tmdb.tmdbDetails.seasons.length; index++) {
                const element = this.tmdb.tmdbDetails.seasons[index];
                if (element.air_date && element.episode_count >0) {
                    let season:Seasons = new Seasons();
                    season.getRecords({query:[Seasons.kSeriesID+';=;'+this.record.SeriesId,Seasons.kSeasonNumber+';=;'+element.season_number]})
                        .then(recs => {
                            if (recs.models.length === 0) {
                                season = new Seasons();
                                season.SeriesID = this.record.SeriesId;
                                season.TMDBID = this.record.TMDBID;
                                season.IMDBTitle = this.record.IMDBTitle;
                                season.ProdYear = element.air_date.substr(0, 4);
                                season.ProductionTitle = this.record.ProductionTitle + ' - Season '+element.season_number;
                                season.SeasonNumber = element.season_number;
                                season.PosterURL = 'http://image.tmdb.org/t/p/w500' + element.poster_path;
                                season.Episodes= element.episode_count;
                                season.IMDBID = this.record.IMDBID;
                                season.JustWatchID = this.record.JustWatchID;
                                season.ActingType = this.record.ActingType;
                                season.NarrativeType = this.record.NarrativeType;

                                season.insertRecord().then(rec => {this.createdSeason()});
                            } else if (recs.models.length === 1) {
                                season = recs.models[0];
                                season.SeriesID = this.record.SeriesId;
                                season.TMDBID = this.record.TMDBID;
                                season.IMDBTitle = this.record.IMDBTitle;
                                season.ProdYear = element.air_date.substr(0, 4);
                                season.ProductionTitle = this.record.ProductionTitle + ' - Season '+element.season_number;
                                season.SeasonNumber = element.season_number;
                                season.PosterURL = 'http://image.tmdb.org/t/p/w500' + element.poster_path;
                                season.Episodes= element.episode_count;

                                season.updateRecord().then(rec => {this.createdSeason()});
                            }
                        })
                } else {this.createdSeason();}
            }


        }
    }

    private seasonCount = 0;
    private createdSeason() {
        if (--this.seasonCount <= 0) {
            alert(this.tmdb.tmdbDetails.seasons.length + ' Season records created/updated.');
            this.refreshSeasonList.emit(); // refresh season list
        }
    }
}
