import { ShellUsers } from '../DB/ShellUsers';
import { Location } from '../DB/Location';

export class ShellUsersEx extends ShellUsers {
    fields: Array<any> = [
        { name: 'LocationName', longname: Location.kLocationName, type: 'text', related: true }
   ].concat(new ShellUsers().fields);

    // related fields

    get LocationName(): string { return this.get('LocationName'); }
    set LocationName(v: string) { this.set('LocationName', v); }

 
}

