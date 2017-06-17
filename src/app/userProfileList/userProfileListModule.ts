// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileListDialog } from './userProfileListDialog';
import { UserProfileListApp } from './userProfileList';
import { ProfileGenesInfo } from './profileGenesInfo';
import { UserProfileInfo } from './userProfileInfo';
import { UserProfileInfoDialog } from './userProfileInfoDialog';
import { UserProfileQueryBand } from './userProfileQueryBand';
import { ViewerContentInfo } from './viewerContentInfo';
import { ProfileRecommendationsInfo } from './profileRecommendationsInfo';
import { EditTasteProfile } from './editTasteProfile';

import { ProfileGenesInfoDialog } from './profileGenesInfoInfoDialog';

import { UserRatingSubModule } from '../userRating/userRatingSubModule';
import { UserRecommendationsSubModule } from '../userRecommendations/userRecommendationsSubModule';

import { JS44DModule } from '../js44D/js44D.module';
import { ModalModule } from '../js44D/modal.module';
import { MGModule } from '../moviegenome/mg.module';

export const UserProfileAppRoute: Routes = [
    {
        path: '',
        component: UserProfileListDialog
    }
];

@NgModule({
  imports: [
      JS44DModule, ModalModule,
      MGModule,
      UserRatingSubModule,
      UserRecommendationsSubModule,
      RouterModule.forChild(UserProfileAppRoute),
      ],
  declarations: [
      UserProfileListDialog, 
      UserProfileListApp,
      UserProfileQueryBand,
      ProfileGenesInfo,
      UserProfileInfoDialog, UserProfileInfo,
      ViewerContentInfo,
      ProfileRecommendationsInfo,
      EditTasteProfile,
      ProfileGenesInfoDialog
      ],
  entryComponents:[
      UserProfileListDialog, UserProfileInfoDialog, UserProfileListApp,
      ProfileGenesInfoDialog
      ]
})

export class UserProfileListModule { }
