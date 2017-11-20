// angular
import { NgModule } from '@angular/core';

import { UserRating } from './userRating';
import { UserRatingDialog } from './userRatingDialog';

import { JS44DModule, ModalModule } from 'js44d/ui';
import { MGModule } from '../moviegenome/mg.module';


@NgModule({
    imports: [
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        UserRating,
        UserRatingDialog
    ],
    entryComponents: [
        UserRatingDialog, UserRating
    ]
})

export class UserRatingSubModule { }
