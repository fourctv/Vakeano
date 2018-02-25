// angular
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { UserRecommendations } from './userRecommendations';
import { UserRecommendationsDialog } from './userRecommendationsDialog';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

@NgModule({
    imports: [
        BsDropdownModule, ButtonsModule, PopoverModule,
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
