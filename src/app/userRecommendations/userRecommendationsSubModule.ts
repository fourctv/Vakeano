// angular
import { NgModule } from '@angular/core';

import { UserRecommendations } from './userRecommendations';
import { UserRecommendationsDialog } from './userRecommendationsDialog';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

@NgModule({
    imports: [
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        UserRecommendations,
        UserRecommendationsDialog
    ],
    entryComponents: [
        UserRecommendationsDialog, UserRecommendations
    ]
})

export class UserRecommendationsSubModule { }
