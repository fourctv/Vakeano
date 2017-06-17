// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeatureListDialog } from './featureListDialog';
import { FeatureListApp } from './featureList';
import { FeatureQueryBand } from './featureQueryBand';
import { FeatureInfoDialog } from './featureInfoDialog';
import { FeatureInfo } from './featureInfo';
import { EditProfile } from './editProfile';
import { ContentProfileInfo } from './contentProfileInfo';
import { AnalyzeFeatureComponent } from './analyzeFeature';

import { JS44DModule } from '../js44D/js44D.module';
import { ModalModule } from '../js44D/modal.module';
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
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        FeatureListDialog,
        FeatureListApp,
        FeatureQueryBand,
        FeatureInfo,
        EditProfile,
        AnalyzeFeatureComponent,
        ContentProfileInfo,
        FeatureInfoDialog
    ],
    entryComponents: [
        FeatureListDialog, FeatureListApp, FeatureInfoDialog, FeatureInfo,
        AnalyzeFeatureComponent
    ]
})

export class FeatureListModule { }
