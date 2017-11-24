// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenomeMapListDialog } from './genomeMapListDialog';
import { GenomeMapListApp } from './genomeMapList';
import { GenomeMapInfoDialog } from './genomeMapInfoDialog';
import { GenomeMapQueryBand } from './genomeMapQueryBand';

import { JS44DModule, ModalModule } from 'js44d';
import { MGModule } from '../moviegenome/mg.module';

export const GenomeMapRoutes: Routes = [
    {
        path: '',
        component: GenomeMapListDialog
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(GenomeMapRoutes),
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        GenomeMapListDialog,
        GenomeMapListApp,
        GenomeMapQueryBand,
        GenomeMapInfoDialog
    ],
    entryComponents: [
        GenomeMapListDialog, GenomeMapListApp, GenomeMapInfoDialog, GenomeMapListApp
    ]
})

export class GenomeMapListModule { }
