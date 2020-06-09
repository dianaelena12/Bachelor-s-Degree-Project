import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TitleSearchComponent } from './search-components/title-search/title-search.component';
import { BrowseRecipesComponent } from './browse/browse-recipes/browse-recipes.component';
import { PopularComponent } from './popular/popular.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HistoryComponent } from './history/history.component';
import { LuckyComponent } from './lucky/lucky.component';
import { SearchByIngredientsComponent } from './search-by-ingredients/search-by-ingredients.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'find-by-title',     component: TitleSearchComponent },
    { path: 'all-recipes',           component: BrowseRecipesComponent },
    { path: 'signup',          component: SignupComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'recipe-details',          component: ProfileComponent },
    { path: 'popular',          component: PopularComponent },
    { path: 'favourites',          component: FavouritesComponent },
    { path: 'history',          component: HistoryComponent },
    { path: 'lucky',          component: LuckyComponent },
    {path: 'find-by-ingredients', component: SearchByIngredientsComponent},
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
