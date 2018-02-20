// angular
import { NgModule } from '@angular/core';

import { FeatureInfoDialog } from './featureInfoDialog';
import { FeatureInfo } from './featureInfo';
import { EditProfile } from './editProfile';
import { ContentProfileInfo } from './contentProfileInfo';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';



@NgModule({
    imports: [
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        FeatureInfo,
        EditProfile,
        ContentProfileInfo,
        FeatureInfoDialog
    ],
    entryComponents: [
        FeatureInfoDialog
    ]
})

export class FeatureInfoModule { }
