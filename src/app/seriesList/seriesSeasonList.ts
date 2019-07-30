import { Component, AfterViewInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FourDCollection, Modal } from 'js44d';
import { DataGrid } from 'js44d';

import { Seasons } from '../moviegenome/DB/Seasons';
import { SeasonEx } from '../moviegenome/customDataModels/SeasonEx';
import { Series } from '../moviegenome/DB/Series';

import { SeasonInfoDialog } from '../seasonList/seasonInfoDialog';

@Component({
    selector: 'series-season-list',
    template: `
    <div style="height:300px;overflow-y:auto;display:block;">
        <datagrid  [height]="350"
            [columns]="columnDefs"
            [useLazyLoading]="false"
            [pageableRefresh]="false"
            [pageableSizes]="false"
        ></datagrid>

   </div>
     `
})

export class SeriesSeasonList implements AfterViewInit {
    @Input() public record: Series;

    public seasonList: FourDCollection = new FourDCollection()

    public columnDefs = [
        { title: 'Season ID', width: 80, field: 'SeasonId' },
        { title: 'JW ID', width: 80, field: 'JustWatchID' },
        { title: 'IMDB ID', width: 80, field: 'IMDBID' },
        { title: 'IMDB Title', width: 200, field: 'IMDBTitle' },
        { title: 'Season', width: 80, field: 'SeasonNumber' },
        { title: 'Prod. Title', width: 250, field: 'ProductionTitle' }
    ];

    @ViewChild(DataGrid, {static: false}) private theGrid: DataGrid;

    constructor(private modal: Modal, private viewRef: ViewContainerRef) {
    }

    ngAfterViewInit() {
        if (this.record && this.theGrid) {
            this.theGrid.recordSelected.subscribe((record: any) => { this.showSeason(); });
            this.seasonList.model = Seasons;
            this.refreshList();
        }
    }

    refreshList() {
        const columns = ['SeasonId', 'JustWatchID', 'IMDBID', 'IMDBTitle', 'SeasonNumber', 'ProductionTitle'];
        this.seasonList.getRecords({ query: [Seasons.kSeriesID + ';=;' + this.record.SeriesId] }, null, 0, -1, '', '>' + Seasons.kSeasonNumber)
            .then(recs => {
                if (recs.length > 0) {
                    let data = [];
                    recs.forEach(element => {
                        let item = element.extractModelData();
                        data.push(item);
                    });

                    this.theGrid.setOptions({ pageable: { messages: { display: recs.length + ' seasons' } } });
                    this.theGrid.dataProvider = this.seasonList;
                    this.theGrid.setDataSource(data);
                }

            })
    }



    /**
     *  Show Episode Record
     *
     */
    showSeason() {
        if (this.theGrid && this.theGrid.currentRecord) {
            let season: SeasonEx = new SeasonEx();
            season.getRecord(this.theGrid.currentRecord.recordNumber)
                .then(rec => {
                    this.modal.openInside(SeasonInfoDialog, this.viewRef, season, SeasonInfoDialog.dialogConfig, true)
                        .then(result => { }); // open edit dialog
                })

        }
    }
}
