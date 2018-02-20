// angular
import { NgModule } from '@angular/core';

import { SeasonInfoDialog } from './seasonInfoDialog';
import { SeasonInfo } from './seasonInfo';
import { SeasonProfile } from './seasonProfile';
import { SeasonContentProfileInfo } from './seasonContentProfileInfo';
import { SeasonEpisodeList } from './seasonEpisodeList';


import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';


@NgModule({
    imports: [
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        SeasonInfo,
        SeasonProfile,
        SeasonEpisodeList,
        SeasonContentProfileInfo,
        SeasonInfoDialog
    ],
    entryComponents: [
        SeasonInfoDialog
    ]
})

export class SeasonInfoModule { }
