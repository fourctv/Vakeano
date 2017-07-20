// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListDialog } from './userManagement.dialog';
import { UserListApp } from './userList.component';
import { UserQueryBand } from './userQueryBand';
import { UserInfoDialog } from './userInfo.dialog';

import { JS44DModule } from '../js44D/js44D.module';
import { ModalModule } from '../js44D/modal.module';
import { MGModule } from '../moviegenome/mg.module';

export const UserManagementAppRoute: Routes = [
    {
        path: '',
        component: UserListDialog
    }
];

@NgModule({
  imports: [
      JS44DModule, ModalModule,
      MGModule,

      RouterModule.forChild(UserManagementAppRoute),
      ],
  declarations: [
      UserListDialog, UserListApp, UserInfoDialog, UserQueryBand
      ],
  entryComponents:[
      UserListDialog, UserInfoDialog, UserListApp
      ]
})

export class UserManagementModule { }
