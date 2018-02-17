// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeriesListDialog } from './seriesListDialog';
import { SeriesListApp } from './seriesList';
import { SeriesQueryBand } from './seriesQueryBand';
import { SeriesInfoDialog } from './seriesInfoDialog';
import { SeriesInfo } from './seriesInfo';
import { SeriesProfile } from './seriesProfile';
import { SeriesContentProfileInfo } from './seriesContentProfileInfo';
import { AnalyzeSeriesComponent } from './analyzeSeries';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

export const SeriesListAppRoute: Routes = [
    {
        path: '',
        component: SeriesListDialog
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(SeriesListAppRoute),
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        SeriesListDialog,
        SeriesListApp,
        SeriesQueryBand,
        SeriesInfo,
        SeriesProfile,
        AnalyzeSeriesComponent,
        SeriesContentProfileInfo,
        SeriesInfoDialog
    ],
    entryComponents: [
        SeriesListDialog, SeriesListApp, SeriesInfoDialog, SeriesInfo,
        AnalyzeSeriesComponent
    ]
})

export class SeriesListModule { }
