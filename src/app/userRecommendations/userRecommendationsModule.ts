// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRecommendations } from './userRecommendations';
import { UserRecommendationsAppDialog } from './userRecommendationsAppDialog';
import { UserRecommendationsSubModule } from './userRecommendationsSubModule';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

export const userRecommendationsRoutes: Routes = [
    {
        path: '',
        component: UserRecommendations
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRecommendationsRoutes),
        JS44DModule, ModalModule,
        MGModule,
        UserRecommendationsSubModule
    ],
    declarations: [
        UserRecommendationsAppDialog
    ],
    entryComponents: [
        UserRecommendationsAppDialog
    ]
})

export class UserRecommendationsModule { }
