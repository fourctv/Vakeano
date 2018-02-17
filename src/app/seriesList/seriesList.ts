import { Component, ViewChild } from '@angular/core';

import { FourDInterface } from 'js44d';
import { DataGrid } from 'js44d';
import { Modal, ModalDialogInstance } from 'js44d';

import { SeriesInfoDialog } from './seriesInfoDialog';
import { AnalyzeSeriesComponent } from './analyzeSeries';

import { SeriesEx } from '../moviegenome/index';

@Component({
    selector: 'series-list',
    template: `
    <web-application>
        <record-list [editWindow]="editWindow" [dialogInstance]="dialog">
            <query-band [enableSort]="true" [enableQBE]="true" [enableButtonBar]="true" [enableAddRecord]="true" [enableDeleteRecord]="true">
                <queryband class="form-group">
                    <series-queryband #customQueryBand class="form-group"></series-queryband>
                </queryband>
                <custombuttonbar>
                    <button class="regularButton" style="width:120px;" (click)="checkSeries()">Analyse</button>
                </custombuttonbar>
            </query-band>
           <datagrid
                [model]="model"
                [columns]="columnDefs"
                [useLazyLoading]="true"
                [optimizeGridLoading]="true"
                [pageSize]="50"
                [excelFilename]="'SeriesList.xlsx'"
                >
            </datagrid>
        </record-list>
    </web-application>
`,
    providers: [Modal]
})

export class SeriesListApp {
    /**
     * get the associated Datagrid object instance
     */
    @ViewChild(DataGrid) theGrid: DataGrid;

    //
    // our Modal Dialog instance, populated by the Modal service, when running inside
    //
    public dialog: ModalDialogInstance = null;

    //
    // Declare Program edit Window
    //
    public editWindow = SeriesInfoDialog;

    //
    // Declare Datagrid properties
    //
    public model = SeriesEx; // the record datamodel to use 

    // the columns for the datagrid
    public columnDefs = [
        { title: 'Series ID', field: 'SeriesId' },
        { title: 'JW ID', field: 'JustWatchID' },
        { title: 'IMDB ID', field: 'IMDBID' },
        { title: 'IMDB Title', field: 'IMDBTitle' },
        { title: 'Prod. Title', field: 'ProductionTitle' },
        { title: 'Prod. Company', field: 'ProdCompany' }
    ];

    //
    // We need access to a Modal dialog component, to open an associated Record Edit Form 
    //
    constructor(private modal: Modal) {
    }

    public checkSeries() {
        if (this.theGrid && this.theGrid.currentRecord) {
            let theRec: SeriesEx = <any>this.theGrid.currentRecord;
            this.modal.openDialog(AnalyzeSeriesComponent, { seriesID: theRec.SeriesId, seriesName: theRec.IMDBTitle }); // open user recomendations dialog
        }
    }
}
