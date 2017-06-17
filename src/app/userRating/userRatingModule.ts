// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRatingAppDialog } from './userRatingAppdialog';
import { UserRatingSubModule } from './userRatingSubModule';

import { JS44DModule } from '../js44D/js44D.module';
import { ModalModule } from '../js44D/modal.module';
import { MGModule } from '../moviegenome/mg.module';

export const UserRatingAppRoute: Routes = [
    {
        path: '',
        component: UserRatingAppDialog
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(UserRatingAppRoute),
        JS44DModule, ModalModule,
        MGModule,
        UserRatingSubModule
    ],
    declarations: [
        UserRatingAppDialog
    ],
    entryComponents: [
        UserRatingAppDialog
    ]
})

export class UserRatingModule { }
