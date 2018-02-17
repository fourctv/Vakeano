import { Series } from '../DB/Series';
import { Companies } from '../DB/Companies';
import { ContentProfile } from '../DB/ContentProfile';
import { ContentProfileEx } from './ContentProfileEx';

export class SeriesEx extends Series {
    fields: Array<any> = [
        { name: 'ProdCompany', longname: Companies.kShortName, type: 'text', related: true },
        { name: 'contentProfileList', subTable: new ContentProfileEx(), joinFK: ContentProfile.kSeriesID, joinPK: Series.kSeriesId }
    ].concat(new Series().fields);

    // related fields
    get ProdCompany(): string { return this.get('ProdCompany'); }
    set ProdCompany(v: string) { this.set('ProdCompany', v); }

    // children records
    get contentProfileList(): Array<ContentProfileEx> {
        return this.get('contentProfileList');
    }
    set contentProfileList(v: Array<ContentProfileEx>) { this.set('contentProfileList', v); }

}

