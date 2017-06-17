// angular
import { NgModule } from '@angular/core';

import { UserRating } from './userRating';
import { UserRatingDialog } from './userRatingDialog';

import { JS44DModule } from '../js44D/js44D.module';
import { ModalModule } from '../js44D/modal.module';
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
