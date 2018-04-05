// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JustWatchItem } from './services/justWatchItem';
import { TMDB } from './services/tmdb';

@NgModule({
    imports: [ CommonModule],
    providers: [JustWatchItem, TMDB]
})
export class MGModule { }
