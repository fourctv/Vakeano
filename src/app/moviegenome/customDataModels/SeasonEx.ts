import { Seasons } from '../DB/Seasons';
import { Series } from '../DB/Series';
import { Companies } from '../DB/Companies';
import { ContentProfile } from '../DB/ContentProfile';
import { ContentProfileEx } from './ContentProfileEx';

export class SeasonEx extends Seasons {
    fields: Array<any> = [
        { name: 'ProdCompany', longname: Companies.kShortName, type: 'text', related: true },
        { name: 'SeriesName', longname: Series.kIMDBTitle, type: 'text', related: true },
        { name: 'contentProfileList', subTable: new ContentProfileEx(), joinFK: ContentProfile.kSeasonID, joinPK: Seasons.kSeasonId }
    ].concat(new Seasons().fields);

    // related fields
    get ProdCompany(): string { return this.get('ProdCompany'); }
    set ProdCompany(v: string) { this.set('ProdCompany', v); }

    get SeriesName(): string { return this.get('SeriesName'); }
    set SeriesName(v: string) { this.set('SeriesName', v); }

    // children records
    get contentProfileList(): Array<ContentProfileEx> {
        return this.get('contentProfileList');
    }
    set contentProfileList(v: Array<ContentProfileEx>) { this.set('contentProfileList', v); }

}

