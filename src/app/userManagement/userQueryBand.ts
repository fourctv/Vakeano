import {Component} from '@angular/core';

import { ShellUsers } from '../moviegenome/index';

@Component({
    selector: 'user-queryband',
    template: `
             <form >
                <label class="fieldPrompt" for="userName" style="margin-right:10px;">User Name</label>
                <input name="userName" type="text" class="fieldEntry"  style="width:180px;height:20px;" [(ngModel)]="userName"/>
                <label class="fieldPrompt" for="firstName" style="margin-right:10px; margin-left:10px;">First Name</label>
                <input name="firstName" type="text" class="fieldEntry"  style="width:180px;height:20px;" [(ngModel)]="firstName"/>
                <label class="fieldPrompt" for="lastName" style="margin-right:10px; margin-left:10px;">Last Name</label>
                <input name="lastName" type="text" class="fieldEntry"  style="width:180px;height:20px;" [(ngModel)]="lastName"/>
           </form>
`
})


export class UserQueryBand {
    //
    // declare quey band fields
    //
    public userName: string = '';
    public firstName: string = '';
    public lastName: string = '';

    //
    // build 4C-TV query based on items from query band
    //
    public get currentQuery(): any {
        let currQuery = [];

        // Query based on User Name
        if (this.userName && this.userName !== '') {
            currQuery.push(ShellUsers.kUserName + ';begins with;' + this.userName + ';AND');
        }
 
        // Query based on First Name
        if (this.firstName && this.firstName !== '') {
            currQuery.push(ShellUsers.kFirstName + ';begins with;' + this.firstName + ';AND');
        }

        // Query on Profile Originl
        if (this.lastName && this.lastName !== '') {
            currQuery.push(ShellUsers.kLastName + ';=;' + this.lastName + ';AND');
        }

        return {query:currQuery};

    }
}
