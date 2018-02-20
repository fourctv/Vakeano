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
import { SeriesSeasonList } from './seriesSeasonList';

import { SeasonInfoModule } from '../seasonList/seasonInfoModule';
import { FeatureInfoModule } from '../featureList/featureInfoModule';


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
        SeasonInfoModule,
        FeatureInfoModule,
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
        SeriesSeasonList,
        SeriesContentProfileInfo,
        SeriesInfoDialog
    ],
    entryComponents: [
        SeriesListDialog, SeriesListApp, SeriesInfoDialog, SeriesInfo,
        AnalyzeSeriesComponent
    ]
})

export class SeriesListModule { }
