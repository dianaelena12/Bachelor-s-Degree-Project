import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { TitleSearchComponent } from './search-components/title-search/title-search.component';
import { BrowseRecipesComponent } from './browse/browse-recipes/browse-recipes.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'find-by-title',     component: TitleSearchComponent },
    { path: 'all-recipes',           component: BrowseRecipesComponent },
    { path: 'signup',          component: SignupComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'recipe-details',          component: ProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
