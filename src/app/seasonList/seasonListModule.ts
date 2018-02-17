// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeasonListDialog } from './seasonListDialog';
import { SeasonListApp } from './seasonList';
import { SeasonQueryBand } from './seasonQueryBand';
import { SeasonInfoDialog } from './seasonInfoDialog';
import { SeasonInfo } from './seasonInfo';
import { SeasonProfile } from './seasonProfile';
import { SeasonContentProfileInfo } from './seasonContentProfileInfo';
import { AnalyzeSeasonComponent } from './analyzeSeason';

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
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        SeasonListDialog,
        SeasonListApp,
        SeasonQueryBand,
        SeasonInfo,
        SeasonProfile,
        AnalyzeSeasonComponent,
        SeasonContentProfileInfo,
        SeasonInfoDialog
    ],
    entryComponents: [
        SeasonListDialog, SeasonListApp, SeasonInfoDialog, SeasonInfo,
        AnalyzeSeasonComponent
    ]
})

export class SeasonListModule { }
