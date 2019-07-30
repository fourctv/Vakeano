import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SeasonEx, Features } from '../moviegenome/index';
import { JustWatchItem, TMDB } from '../moviegenome/index';
import { FourDInterface } from 'js44d';

@Component({
    moduleId: module.id,
    selector: 'season-info',
    templateUrl: 'seasonInfo.html'
})

export class SeasonInfo {
    @Input() public record: SeasonEx;
    @Input() public tmdb: TMDB;

    @Output() public refreshEpisodeList: EventEmitter<any> = new EventEmitter();

    public get showCreateEpisodes(): boolean {
        return (this.record.isRecordLoaded() && this.tmdb && this.tmdb.tmdbDetails && this.tmdb.tmdbDetails.episodes && this.tmdb.tmdbDetails.episodes.length > 0);
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
    public createEpisodes() {
        if (this.tmdb && this.tmdb.tmdbDetails && this.tmdb.tmdbDetails.episodes && this.tmdb.tmdbDetails.episodes.length > 0) {
            this.episodeCount = this.tmdb.tmdbDetails.episodes.length;
            for (let index = 0; index < this.tmdb.tmdbDetails.episodes.length; index++) {
                const element = this.tmdb.tmdbDetails.episodes[index];
                if (element.air_date && element.episode_number >0) {
                    let episode: Features = new Features();
                    episode.getRecords({ query: [Features.kSeasonID + ';=;' + this.record.SeasonId, Features.kEpisodeNumber + ';=;' + element.episode_number] })
                        .then(recs => {
                            if (recs.models.length === 0) {
                                episode = new Features();
                                episode.SeriesID = this.record.SeriesID;
                                episode.SeasonID = this.record.SeasonId;
                                episode.TMDBID = this.record.TMDBID;
                                episode.IMDBTitle = this.record.IMDBTitle + ' - Season ' + this.record.SeasonNumber + ' - Episode ' + element.episode_number;
                                if (element.air_date) episode.ProdYear = element.air_date.substr(0, 4);
                                episode.ProductionTitle = element.name;
                                episode.EpisodeNumber = element.episode_number;
                                episode.PosterURL = 'http://image.tmdb.org/t/p/w500' + element.still_path;
                                episode.IMDBID = this.record.IMDBID;
                                episode.JustWatchID = this.record.JustWatchID;
                                episode.ActingType = this.record.ActingType;
                                episode.NarrativeType = this.record.NarrativeType;

                                episode.insertRecord().then(rec => { this.createdEpisode() });
                            } else if (recs.models.length === 1) {
                                episode = recs.models[0];
                                episode.TMDBID = this.record.TMDBID;
                                episode.IMDBTitle = this.record.IMDBTitle + ' - Season ' + this.record.SeasonNumber + ' - Episode ' + element.episode_number;
                                episode.ProdYear = element.air_date.substr(0, 4);
                                episode.ProductionTitle = element.name;
                                episode.EpisodeNumber = element.episode_number;
                                episode.PosterURL = 'http://image.tmdb.org/t/p/w500' + element.still_path;

                                episode.updateRecord().then(rec => { this.createdEpisode() });
                            }
                        })
                } else {this.createdEpisode();}
            }

        }
    }

    private episodeCount = 0;
    private createdEpisode() {
        if (--this.episodeCount <= 0) {
            alert(this.tmdb.tmdbDetails.episodes.length + ' Episode records created/updated.');
            this.refreshEpisodeList.emit(); // refresh season list
        }
    }
}
