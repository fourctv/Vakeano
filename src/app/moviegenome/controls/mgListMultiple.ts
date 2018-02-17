import { Component, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';

import { ShellLists } from '../DB/ShellLists';

import { FourDCollection } from 'js44d';

@Component({
    selector: 'mglist-multiple',
    template: `
        <div dropdown style="display:inline-block;border-width:1px;border-style:inset;width:inherit;height:17px;">
            <a role="button" class="btn fieldEntry" placeholder="xxxxxxxxxxx" (click)="false" style="width:100%;padding:0;color:black;overflow:scroll;text-align:left;" dropdownToggle>{{selectedValue}}</a>
            <ul *dropdownMenu class="dropdown-menu" style="position:relative; top:1px; left:1px;">
                <li role="menuitem" *ngFor='let item of listOptions'><a class="dropdown-item" (click)="doSelect(item)">{{isItemSelected(item) + item}}</a></li>
            </ul>
        </div>
    `
})

export class MGListMultiple implements AfterContentInit {
    @Input() public listName: string;
    @Input() public selectedValue: string = '';
    public listOptions: Array<string> = [];
    public showList = "display:none";

    @Output() change: EventEmitter<any> = new EventEmitter();

    private shellList: ShellLists;
    private expanded = false;

    private static _listCache: any = {};

    ngAfterContentInit() {
        if (this.listName) {
            if (MGListMultiple._listCache[this.listName]) {
                // list is cached, reuse it
                this.listOptions = MGListMultiple._listCache[this.listName];
            } else {
                this.shellList = new ShellLists();
                let query = { query: [ShellLists.kListName + ';=;' + this.listName] };
                this.shellList.getRecords(query)
                    .then((recs: FourDCollection) => {
                        this.listOptions = [];
                        recs.models.forEach((rec: ShellLists) => {
                            this.listOptions.push(rec.ElementShortValue);
                        });
                        MGListMultiple._listCache[this.listName] = this.listOptions; // cache list
                    })
                    .catch((reason) => { console.log('error', reason); });
            }
        }
    }

    doSelect(item:string) {
        if (this.isItemSelected(item) === '') {
            this.selectedValue = (this.selectedValue && this.selectedValue != '')?this.selectedValue+','+item:item;
        } else {
            let items = this.selectedValue.split(',');
            this.selectedValue = items.filter(v => {return (v != item)}).toString();
        }

        this.change.emit(this.selectedValue);
    }


    isItemSelected(item: string): string {
        return (this.selectedValue && this.selectedValue.includes(item)) ? '• ' : '';
    }

}
