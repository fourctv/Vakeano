// angular
import { Component, Inject } from '@angular/core';
import { Route } from '@angular/router';
import { HttpClient }      from '@angular/common/http';


import { FourDInterface } from 'js44d';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../login/signUp.component';

import { UserRecommendations } from '../userRecommendations/userRecommendations';
import { UserRating } from '../userRating/userRating';
import { UserRecommendationPage } from '../userRecommendations/userRecommendationPage'; 
import { ProfileBuildingPage } from '../userRating/profileBuildingPage'; 
import { CuratedProfiles } from '../userRecommendations/curatedProfile';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'userRating', component: UserRating },
  { path: 'userRecommendations', component: UserRecommendations },

      {path: 'userRecommendationPage', component: UserRecommendationPage},
      {path: 'curatedRecommendationPage/:profileID', component: UserRecommendationPage},
      {path: 'curatedProfile', component: CuratedProfiles},
      {path: 'profileBuildingPage', component: ProfileBuildingPage},
  
  { path: '**', component: LoginComponent }
];


@Component({
  moduleId: module.id,
  selector: 'vakeano-app',
  providers: [FourDInterface],
  templateUrl: 'vakeanoApp.component.html',
  styleUrls: ['vakeanoApp.component.css']
})
export class VakeanoAppComponent {

  constructor( private http: HttpClient) {
    FourDInterface.http = http;
    FourDInterface.fourDUrl = 'http://www.vakeano.com';

  }

}
