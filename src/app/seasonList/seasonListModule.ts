// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeasonListDialog } from './seasonListDialog';
import { SeasonListApp } from './seasonList';
import { SeasonQueryBand } from './seasonQueryBand';
import { AnalyzeSeasonComponent } from './analyzeSeason';

import { SeasonInfoModule } from './seasonInfoModule';
import { FeatureInfoModule } from '../featureList/featureInfoModule';


import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

export const SeasonListAppRoute: Routes = [
    {
        path: '',
        component: SeasonListDialog
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(SeasonListAppRoute),
        SeasonInfoModule,
        FeatureInfoModule,
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        SeasonListDialog,
        SeasonListApp,
        SeasonQueryBand,
        AnalyzeSeasonComponent
    ],
    entryComponents: [
        SeasonListDialog, SeasonListApp,
        AnalyzeSeasonComponent
    ]
})

export class SeasonListModule { }
