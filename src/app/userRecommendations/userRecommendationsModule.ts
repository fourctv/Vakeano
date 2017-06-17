// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRecommendationsAppDialog } from './userRecommendationsAppDialog';
import { UserRecommendationsSubModule } from './userRecommendationsSubModule';

import { JS44DModule } from '../js44D/js44D.module';
import { ModalModule } from '../js44D/modal.module';
import { MGModule } from '../moviegenome/mg.module';

export const userRecommendationsRoutes: Routes = [
    {
        path: '',
        component: UserRecommendationsAppDialog
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
