// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TheaterManagementDialog } from './theatherManagement.dialog';
import { TheaterManagementApp } from './theaterManagement.component';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

export const TheaterManagementAppRoute: Routes = [
    {
        path: '',
        component: TheaterManagementDialog
    }
];

@NgModule({
  imports: [
      JS44DModule, ModalModule,
      MGModule,

      RouterModule.forChild(TheaterManagementAppRoute),
      ],
  declarations: [
      TheaterManagementDialog, TheaterManagementApp
      ],
  entryComponents:[
      TheaterManagementDialog, TheaterManagementApp
      ]
})

export class TheaterManagementModule { }
