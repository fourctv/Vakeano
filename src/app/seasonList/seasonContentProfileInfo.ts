import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';


import { DataGrid } from 'js44d';
import { SeriesEx } from '../moviegenome/index';

@Component({
    selector: 'seasoncontentprofile-info',
    template: `
    <div style="height:300px;overflow-y:auto;display:block;">
        <datagrid  [height]="350"
            [columns]="columnDefs"
            [useLazyLoading]="false"
            [pageableRefresh]="false"
            [pageableSizes]="false"
            [pageableMessage]="recordCount"
        ></datagrid>

   </div>
     `
})


export class SeasonContentProfileInfo implements AfterViewInit {
    @Input() public record: SeriesEx;

    public get recordCount():string {return (this.record.contentProfileList)?this.record.contentProfileList.length.toString()+' items':'0';}

    public columnDefs = [
        { title: 'ID', width:80, field: 'GeneID' },
        { title: 'Gene Name', width:250, field: 'GeneName' },
        { title: 'Gene Vector', width:150, field: 'GeneVector', filterable: { multi: true }  },
        { title: 'Gene Cluster', width:150, field: 'GeneCluster', filterable: { multi: true }  },
        { title: 'Curator Name', field: 'CuratorName' },
        { title: 'Value', width:80, field: 'CoordinateValue' }
    ];

    @ViewChild(DataGrid, {static: false}) private theGrid: DataGrid;

    ngAfterViewInit() {
        if (this.record && this.theGrid) this.theGrid.setDataSource(<any>this.record.contentProfileList);
    }

}
