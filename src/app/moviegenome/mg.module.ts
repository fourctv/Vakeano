// angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MGListDropDown } from './controls/mgListDropDown';
import { MGListMultiple } from './controls/mgListMultiple';
import { JustWatchItem } from './services/justWatchItem';
import { TMDB } from './services/tmdb';

@NgModule({
    imports: [FormsModule, CommonModule, BsDropdownModule.forRoot()],
    declarations: [
        MGListDropDown, MGListMultiple
    ],
    providers: [JustWatchItem, TMDB],
    exports: [FormsModule, CommonModule, 
        MGListDropDown, MGListMultiple
    ]
})
export class MGModule { }
