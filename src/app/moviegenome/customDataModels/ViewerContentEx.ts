import { ViewerContent } from '../DB/ViewerContent';
import { Features } from '../DB/Features';
import { Series } from '../DB/Series';
import { Seasons } from '../DB/Seasons';


export class ViewerContentEx extends ViewerContent {
    fields: Array<any> = [
        { name: 'JustWatchID', type: 'text', related: true },
        { name: 'TMDBID', type: 'text', related: true },
        { name: 'IMDBID', type: 'text', related: true },
        { name: 'IMDBTitle', type: 'text', related: true },
        { name: 'PosterURL', type: 'text', related: true },
        { name: 'ProdYear', type: 'text', related: true },
        { name: 'DirectorsList', type: 'text', related: true },
        { name: 'FeatureIMDBID', longname: Features.kIMDBID, type: 'text', related: true },
        { name: 'FeatureTMDBID', longname: Features.kTMDBID, type: 'text', related: true },
        { name: 'FeatureJWID', longname: Features.kJustWatchID, type: 'text', related: true },
        { name: 'FeatureTitle', longname: Features.kIMDBTitle, type: 'text', related: true },
        { name: 'FeaturePosterURL', longname: Features.kPosterURL, type: 'text', related: true },
        { name: 'FeatureProdYear', longname: Features.kProdYear, type: 'text', related: true },
        { name: 'FeatureDirectorsList', longname: Features.kDirectorsList, type: 'text', related: true },
        { name: 'Series.IMDBID', longname: Series.kIMDBID, type: 'text', related: true },
        { name: 'Series.TMDBID', longname: Series.kTMDBID, type: 'text', related: true },
        { name: 'SeriesJWID', longname: Series.kJustWatchID, type: 'text', related: true },
        { name: 'SeriesTitle', longname: Series.kIMDBTitle, type: 'text', related: true },
        { name: 'SeriesPosterURL', longname: Series.kPosterURL, type: 'text', related: true },
        { name: 'SeriesProdYear', longname: Series.kProdYear, type: 'text', related: true },
        { name: 'SeasonIMDBID', longname: Seasons.kIMDBID, type: 'text', related: true },
        { name: 'SeasonTMDBID', longname: Seasons.kTMDBID, type: 'text', related: true },
        { name: 'SeasonJWID', longname: Seasons.kJustWatchID, type: 'text', related: true },
        { name: 'SeasonTitle', longname: Seasons.kProductionTitle, type: 'text', related: true },
        { name: 'SeasonPosterURL', longname: Seasons.kPosterURL, type: 'text', related: true },
        { name: 'SeasonProdYear', longname: Seasons.kProdYear, type: 'text', related: true },
        ].concat(new ViewerContent().fields);

    // related fields
    set FeatureIMDBID(v: string) { if (v && v != '') this.set('IMDBID', v); }

    set FeatureTMDBID(v: string) { if (v && v != '') this.set('TMDBID', v); }
    
    set FeatureJWID(v: string) { if (v && v != '') this.set('JustWatchID', v); }

    set FeatureTitle(v: string) { if (v && v != '') this.set('IMDBTitle', v); }

    set FeaturePosterURL(v: string) { if (v && v != '') this.set('PosterURL', v); }

    set FeatureProdYear(v: number) { if (v && v != 0) this.set('ProdYear', v); }

    set FeatureDirectorsList(v: string) { if (v && v != '') this.set('DirectorsList', v); }

    set SeriesIMDBID(v: string) { if (v && v != '') this.set('IMDBID', v); }

    set SeriesTMDBID(v: string) { if (v && v != '') this.set('TMDBID', v); }

    set SeriesJWID(v: string) { if (v && v != '') this.set('JustWatchID', v); }

    set SeriesTitle(v: string) { if (v && v != '') this.set('IMDBTitle', v); }

    set SeriesPosterURL(v: string) { if (v && v != '') this.set('PosterURL', v); }

    set SeriesProdYear(v: number) { if (v && v != 0) this.set('ProdYear', v); }

    set SeasonIMDBID(v: string) { if (v && v != '') this.set('IMDBID', v); }

    set SeasontMDBID(v: string) { if (v && v != '') this.set('TMDBID', v); }

    set SeasonJWID(v: string) { if (v && v != '') this.set('JustWatchID', v); }

    set SeasonTitle(v: string) { if (v && v != '') this.set('IMDBTitle', v); }

    set SeasonPosterURL(v: string) { if (v && v != '') this.set('PosterURL', v); }

    set SeasonProdYear(v: number) { if (v && v != 0) this.set('ProdYear', v); }

    get JustWatchID(): string { return this.get('JustWatchID'); }
    set JustWatchID(v: string) { this.set('JustWatchID', v); }

    get IMDBID(): string { return this.get('IMDBID'); }
    set IMDBID(v: string) { this.set('IMDBID', v); }

    get TMDBID(): string { return this.get('TMDBID'); }
    set TMDBID(v: string) { this.set('TMDBID', v); }

    get IMDBTitle(): string { return this.get('IMDBTitle'); }
    set IMDBTitle(v: string) { this.set('IMDBTitle', v); }

    get PosterURL(): string { return this.get('PosterURL'); }
    set PosterURL(v: string) { this.set('PosterURL', v); }
    
    get ProdYear(): number { return this.get('ProdYear'); }
    set ProdYear(v: number) { this.set('ProdYear', v); }

    get DirectorsList(): string { return this.get('DirectorsList'); }
    set DirectorsList(v: string) { this.set('DirectorsList', v); }

    // calculated fields
    get FullResPosterURL(): string {
        return this.get('PosterURL');
        /* for now didsable this, there seems to be some problems with IMDB 
        let poster:string = this.get('PosterURL');
        if (poster && poster.indexOf('imdb.com')>0) {
            let marker = poster.indexOf("._");
            return (marker>0)?poster.substr(0,marker)+ '._V1_UX512_.jpg':poster;
        } else return poster;
        */
    }
}
