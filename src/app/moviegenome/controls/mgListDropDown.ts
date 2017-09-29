import { Component, Input, AfterContentInit} from '@angular/core';

import {ShellLists} from '../DB/ShellLists';

import {FourDCollection} from '../../js44D/js44D/JSFourDCollection';

@Component({
    selector: 'mglist-dropdown',
    styles : [`.mglistDropdown {
                margin: inherit;
                width: inherit;
                padding: inherit;
                font-size: inherit;
                border: 1px solid #ccc;
                height: inherit;
                }
            `], 
    template: `
        <select  #selector class='mglistDropdown' (change)='selectedValue = $event.target.value' [(value)]='selectedValue'>
            <option *ngFor='let item of listOptions' value='{{item}}' [selected]='isItemSelected(item)'>{{item}}</option>
        </select>
       `
})

export class MGListDropDown implements AfterContentInit {
    @Input() public listName: string;
    @Input() public selectedValue: string;
    @Input() public listOptions: Array<string> = [];

    private shellList:ShellLists;

    private static _listCache: any = {};
    
    ngAfterContentInit() {
        if (this.listName) {
            if (MGListDropDown._listCache[this.listName]) {
                // list is cached, reuse it
                this.listOptions = MGListDropDown._listCache[this.listName];
            } else {
                this.shellList = new ShellLists();
                let query = {query:[ShellLists.kListName+';=;'+this.listName]};
                this.shellList.getRecords(query)
                    .then((recs:FourDCollection) => {
                        this.listOptions = [''];
                        recs.models.forEach((rec:ShellLists) => {
                            this.listOptions.push(rec.ElementShortValue);
                        });
                        MGListDropDown._listCache[this.listName] = this.listOptions; // cache list
                    })
                    .catch((reason) => { console.log('error', reason); });
            }
        }
    }

    isItemSelected(item: string): string {
        return (item === this.selectedValue) ? 'selected' : '';
    }

}
