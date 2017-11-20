import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';


import { FourDInterface } from 'js44d';
import { FourDCollection } from 'js44d';

import { TasteProfiles } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'curatedprofile',
    templateUrl : 'curatedProfile.html' ,
    changeDetection: ChangeDetectionStrategy.Default
})

export class CuratedProfiles implements OnInit {
           
   
    @Input() profileList:FourDCollection = new FourDCollection();
    @Input() isLoading = false;


    constructor(private fourD:FourDInterface, private router:RouterExtensions) {
       
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.isLoading = true;
        this.profileList.model = TasteProfiles;
        this.refreshList();
    }
    
  
    refreshList() {
        let query={query:[TasteProfiles.kOrigin+';=;Curator']};

        //console.log('query:'+queryType);
        this.profileList.getRecords(query,
                                    [TasteProfiles.kProfileID, TasteProfiles.kName, TasteProfiles.kDescription])
            .then(recs => {
                console.log('length:'+recs.length);
                if (recs.length > 0) {
                     this.isLoading = false;
                 }
             });
    }

    //
    // handle user tap on a title: show details
    //
    onItemTap(event) {
        let selectProfile:TasteProfiles = this.profileList.models[event.index];
        console.log('tap:'+selectProfile.Name);
        this.router.navigate(['/curatedRecommendationPage',selectProfile.ProfileID], { clearHistory:true })
    }

}
