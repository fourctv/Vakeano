// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeatureListDialog } from './featureListDialog';
import { FeatureListApp } from './featureList';
import { FeatureQueryBand } from './featureQueryBand';
import { AnalyzeFeatureComponent } from './analyzeFeature';

import { FeatureInfoModule } from './featureInfoModule';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

export const FeatureListAppRoute: Routes = [
    {
        path: '',
        component: FeatureListDialog
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(FeatureListAppRoute),
        FeatureInfoModule,
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        FeatureListDialog,
        FeatureListApp,
        FeatureQueryBand,
        AnalyzeFeatureComponent
    ],
    entryComponents: [
        FeatureListDialog, FeatureListApp,
        AnalyzeFeatureComponent
    ]
})

export class FeatureListModule { }
