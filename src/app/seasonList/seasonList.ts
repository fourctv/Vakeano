import { Component, ViewChild } from '@angular/core';

import { FourDInterface } from 'js44d';
import { DataGrid } from 'js44d';
import { Modal, ModalDialogInstance } from 'js44d';

import { SeasonInfoDialog } from './seasonInfoDialog';
import { AnalyzeSeasonComponent } from './analyzeSeason';

import { SeasonEx } from '../moviegenome/index';

@Component({
    selector: 'series-list',
    template: `
    <web-application>
        <record-list [editWindow]="editWindow" [dialogInstance]="dialog">
            <query-band [enableSort]="true" [enableQBE]="true" [enableButtonBar]="true" [enableAddRecord]="true" [enableDeleteRecord]="true">
                <queryband class="form-group">
                    <season-queryband #customQueryBand class="form-group"></season-queryband>
                </queryband>
                <custombuttonbar>
                    <button class="regularButton" style="width:120px;" (click)="checkSeason()">Analyse</button>
                </custombuttonbar>
            </query-band>
           <datagrid
                [model]="model"
                [columns]="columnDefs"
                [useLazyLoading]="true"
                [optimizeGridLoading]="true"
                [pageSize]="50"
                [excelFilename]="'SeasonList.xlsx'"
                >
            </datagrid>
        </record-list>
    </web-application>
`,
    providers: [Modal]
})

export class SeasonListApp {
    /**
     * get the associated Datagrid object instance
     */
    @ViewChild(DataGrid, {static: false}) theGrid: DataGrid;

    //
    // our Modal Dialog instance, populated by the Modal service, when running inside
    //
    public dialog: ModalDialogInstance = null;

    //
    // Declare Program edit Window
    //
    public editWindow = SeasonInfoDialog;

    //
    // Declare Datagrid properties
    //
    public model = SeasonEx; // the record datamodel to use

    // the columns for the datagrid
    public columnDefs = [
        { title: 'Season ID', field: 'SeasonId' },
        { title: 'JW ID', field: 'JustWatchID' },
        { title: 'IMDB ID', field: 'IMDBID' },
        { title: 'IMDB Title', field: 'IMDBTitle' },
        { title: 'Season', field: 'SeasonNumber' },
        { title: 'Prod. Title', field: 'ProductionTitle' },
        { title: 'Prod. Company', field: 'ProdCompany' }
    ];

    //
    // We need access to a Modal dialog component, to open an associated Record Edit Form
    //
    constructor(private modal: Modal) {
    }

    public checkSeason() {
        if (this.theGrid && this.theGrid.currentRecord) {
            let theRec: SeasonEx = <any>this.theGrid.currentRecord;
            this.modal.openDialog(AnalyzeSeasonComponent, { seasonID: theRec.SeasonId, seasonName: theRec.ProductionTitle }); // open user recomendations dialog
        }
    }
}
