import { Component } from '@angular/core';

import { Seasons } from '../moviegenome/index';

@Component({
    selector: 'season-queryband',
    template: `
            <form>
                <label class="fieldPrompt" for="seriesTitle" style="margin-right:10px;">Series Title</label>
                <input name="seriesTitle" type="text" class="fieldEntry"  style="width:180px;height:20px;" [(ngModel)]="seriesTitle"/>
                <input type="checkbox" class="fieldEntry" name="toBeCurated" [(ngModel)]="toBeCurated" style="margin-left:30px;margin-right:10px;"/>to be Curated
            </form>
`
})


export class SeasonQueryBand {
    //
    // declare quey band fields
    //
    public seriesTitle: string = '';
    public toBeCurated: boolean = false;

    //
    // build 4C-TV query based on items from query band
    //
    public get currentQuery(): Object {
        let query: any;

        // Query based on Feature title
        if (this.seriesTitle && this.seriesTitle !== '') {
            query = { query: [Seasons.kIMDBTitle + ';contains;' + this.seriesTitle + ';OR', Seasons.kProductionTitle + ';contains;' + this.seriesTitle + ';OR'] };
        }

        // query based on to be curated flag
        if (this.toBeCurated) {
            let curated = [];
            curated.push(Seasons.kContentVector + ';=;;OR');
            curated.push(Seasons.kExecutionVector + ';=;;OR');
            curated.push(Seasons.kNarrativeVector + ';=;;OR');
            curated.push(Seasons.kStyleVector + ';=;;OR');
            curated.push(Seasons.kThemeVector + ';=;;OR');
            if (query) { query = { intersection: [query, { query: curated }] }; } else { query = { query: curated }; }

        }

        return query;

    }
}
