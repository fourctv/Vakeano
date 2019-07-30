import { Component, AfterViewInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FourDCollection, Modal } from 'js44d';
import { DataGrid } from 'js44d';

import { Seasons } from '../moviegenome/DB/Seasons';
import { Features } from '../moviegenome/DB/Features';
import { FeaturesEx } from '../moviegenome/customDataModels/FeaturesEx';
import { FeatureInfoDialog } from '../featureList/featureInfoDialog';


@Component({
    selector: 'season-episode-list',
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

export class SeasonEpisodeList implements AfterViewInit {
    @Input() public record: Seasons;

    public featureList: FourDCollection = new FourDCollection()

    public columnDefs = [
        { title: 'Feature ID', width: 80, field: 'FeatureId' },
        { title: 'JW ID', width: 80, field: 'JustWatchID' },
        { title: 'IMDB ID', width: 80, field: 'IMDBID' },
        { title: 'IMDB Title', width: 250, field: 'IMDBTitle' },
        { title: 'Prod. Title', width: 250, field: 'ProductionTitle' },
        { title: 'Episode', width: 80, field: 'EpisodeNumber' },
        { title: 'Prod. Year', width: 80, field: 'ProdYear' }
    ];

    @ViewChild(DataGrid, {static: false}) private theGrid: DataGrid;

    constructor(private modal: Modal, private viewRef: ViewContainerRef) {
    }

    ngAfterViewInit() {
        if (this.record && this.theGrid) {
            this.theGrid.recordSelected.subscribe((record: any) => { this.showEpisode(); });
            this.refreshList();
        }
    }

    refreshList() {
        this.featureList.model = Features;
        const columns = ['FeatureId', 'JustWatchID', 'IMDBID', 'IMDBTitle', 'EpisodeNumber', 'ProductionTitle', 'ProdYear'];
        this.featureList.getRecords({ query: [Features.kSeasonID + ';=;' + this.record.SeasonId] }, null, 0, -1, '', '>' + Features.kEpisodeNumber)
            .then(recs => {
                if (recs.length > 0) {
                    let data = [];
                    recs.forEach(element => {
                        let item = element.extractModelData();
                        data.push(item);
                    });

                    this.theGrid.setOptions({ pageable: { messages: { display: recs.length + ' episodes' } } });
                    this.theGrid.dataProvider = this.featureList;
                    this.theGrid.setDataSource(data);
                }

            })
    }


    /**
     *  Show Episode Record
     *
     */
    showEpisode() {
        if (this.theGrid && this.theGrid.currentRecord) {
            let feature: FeaturesEx = new FeaturesEx();
            feature.getRecord(this.theGrid.currentRecord.recordNumber)
                .then(rec => {
                    this.modal.openInside(FeatureInfoDialog, this.viewRef, feature, FeatureInfoDialog.dialogConfig, true)
                        .then(result => { }); // open edit dialog
                })

        }
    }
}
