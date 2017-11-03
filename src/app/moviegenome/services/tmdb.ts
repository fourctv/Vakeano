import { Injectable } from '@angular/core';

import { FourDInterface } from '../../js44D/js44D/JSFourDInterface';
import { JustWatchItem } from './justWatchItem';

import { Features } from '../index';

@Injectable()
export class TMDB {
    private static apiKey:string = '5517e60f4556842f3df61a18e7c55f71';

    public tmdbRecord: any = null;
    public tmdbDetails: any = null;
    public tmdbList = [];

    public get tmdbID(): number { return (this.tmdbRecord) ? this.tmdbRecord.id : null }
    public get posterURL(): string { return (this.tmdbRecord) ? 'http://image.tmdb.org/t/p/w500' + this.tmdbRecord.poster_path : '' }
    public get iconURL(): string { return (this.tmdbRecord) ? 'http://image.tmdb.org/t/p/w92' + this.tmdbRecord.poster_path : '' }
    public get movieURL(): string { return (this.tmdbDetails) ? this.tmdbDetails.homepage : '' }

    private userLocale:string = 'en_US'; // this is the default locale for all users

    constructor(public fourD: FourDInterface) {
        if (FourDInterface.authentication && FourDInterface.authentication['location']) {
            if (FourDInterface.authentication.location['locale'] && FourDInterface.authentication.location['locale'] != '') {
                this.userLocale = FourDInterface.authentication.location['locale'];
            }
        }
     }

    /**
     * Query TMDB for a Given title
     * @param title movie title
     * @param prodYear movie's production year (optional)
     */
    public queryTMDB(title: string, prodYear: number = 0): Promise<any> {
        const contentHeaders = new Headers();
        contentHeaders.append('Accept', 'text/json;text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8'); // need all this crap for 4D V15!!
        let tmdbURL = 'https://api.themoviedb.org/3/search/movie?api_key='+ TMDB.apiKey + '&language=en-US&query=' + title;

        return new Promise((resolve, reject) => {
            this.fourD.proxyURLThru4D(tmdbURL)
                .subscribe(resultJSON => {
                    this.tmdbRecord = null;
                    this.tmdbList = [];
                    if (resultJSON.results.length === 1) {
                        this.tmdbRecord = resultJSON.results[0];
                    } else {
                        this.tmdbList = resultJSON.results;
                        for (var index = 0; index < this.tmdbList.length; index++) {
                            var item = this.tmdbList[index];
                            if (item.title === title && item.release_date.substr(0,4) === prodYear.toString()) {
                                this.tmdbRecord = item;
                                break;
                            }
                        }
                    }

                    resolve(this.tmdbRecord);

                },
                error => { reject(error) }
                )
        });

    }



    public getTMDBDetails(id: string): Promise<any> {
        const contentHeaders = new Headers();
        contentHeaders.append('Accept', 'text/json;text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8'); // need all this crap for 4D V15!!
        let tmdbURL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + TMDB.apiKey + '&language=en-US&append_to_response=release_dates%2Ccredits';

        return new Promise((resolve, reject) => {
            this.fourD.proxyURLThru4D(tmdbURL)
                .subscribe(
                response => {
                    this.tmdbDetails = response;
//                    console.log(this.tmdbDetails);
                    resolve(this.tmdbDetails);

                },
                error => {
                    this.tmdbDetails = null;
                    reject(error);
                }
                );
        });

    }


    /**
     * Grab data from TMDB and populate a Feature record
     * 
     * @param feature the Feature record to update with TMDB Data 
     */
    public grabTMDBData(feature:Features):Promise<any> {
        if (this.tmdbRecord) {
    //        console.log(this.tmdbRecord);
            feature.TMDBID = this.tmdbRecord.id.toString();
            feature.PosterURL = this.posterURL;
            feature.IMDBTitle = this.tmdbRecord.title;
            feature.ProductionTitle = this.tmdbRecord.original_title;
            feature.ProdYear = this.tmdbRecord.release_date.substr(0,4);

            // now grab additional details about this title
            const contentHeaders = new Headers();
            contentHeaders.append('Accept', 'text/json;text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8'); // need all this crap for 4D V15!!
            let tmdbURL = 'https://api.themoviedb.org/3/movie/' + this.tmdbRecord.id + '?api_key=' + TMDB.apiKey + '&language=en-US&append_to_response=release_dates%2Ccredits';
    
            return new Promise((resolve, reject) => {
                this.fourD.proxyURLThru4D(tmdbURL)
                .subscribe(
                response => {
                    this.tmdbDetails = response;
//                    console.log(this.tmdbDetails);

                    // grab IMDB ID
                    feature.IMDBID = this.tmdbDetails.imdb_id;
/*
                    // grab Production Company info
                    if (this.tmdbDetails.production_companies && this.tmdbDetails.production_companies.length > 0) {
                        feature.ProdCompanyID = this.tmdbDetails.production_companies[0].name;
                    }
*/
                    // grab Production Country info
                    if (this.tmdbDetails.production_countries && this.tmdbDetails.production_countries.length > 0) {
                        feature.CountryOfOrigin = this.tmdbDetails.production_countries[0].name;
                    }

                    // grab Cast List
                    if (this.tmdbDetails.credits && this.tmdbDetails.credits.cast && this.tmdbDetails.credits.cast.length > 0) {
                        feature.FeatureCast = '';
                        for (var index = 0; index < this.tmdbDetails.credits.cast.length && index < 5; index++) {
                            var cast = this.tmdbDetails.credits.cast[index];
                            feature.FeatureCast += (feature.FeatureCast === '')?cast.name:', '+cast.name;
                        }
                        if (this.tmdbDetails.credits.cast.length > 5) feature.FeatureCast += ', ...';
                    }

                    // grab Director List
                    if (this.tmdbDetails.credits && this.tmdbDetails.credits.crew && this.tmdbDetails.credits.crew.length > 0) {
                        feature.DirectorsList = '';
                        this.tmdbDetails.credits.crew.forEach(crew => {
                            if (crew.job && crew.name && crew.job === 'Director') {
                                feature.DirectorsList += (feature.DirectorsList === '')?crew.name:', '+crew.name;
                            }
                        });
                    }

                    // grab Spoken Languages List
                    if (this.tmdbDetails.spoken_languages && this.tmdbDetails.spoken_languages.length > 0) {
                        feature.OrigLanguages = '';
                        this.tmdbDetails.spoken_languages.forEach(language => {
                            if (language.name) {
                                feature.OrigLanguages += (feature.OrigLanguages === '')?language.name:', '+language.name;
                            }
                        });
                    }

                    resolve(this.tmdbDetails);

                },
                error => { reject(error) }
                )
            });
        } else return null;
    }

}