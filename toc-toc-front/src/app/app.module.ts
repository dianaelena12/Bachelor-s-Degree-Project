import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { TitleSearchComponent } from './search-components/title-search/title-search.component';
import { BrowseRecipesComponent } from './browse/browse-recipes/browse-recipes.component';
import { TokenInterceptor } from './services/token-interceptor';
import { PopularComponent } from './popular/popular.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HistoryComponent } from './history/history.component';
import { LuckyComponent } from './lucky/lucky.component';
import { SearchByIngredientsComponent } from './search-by-ingredients/search-by-ingredients.component';

// export function tokenGetter() {
//   return localStorage.getItem('token');
// }
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    TitleSearchComponent,
    BrowseRecipesComponent,
    PopularComponent,
    FavouritesComponent,
    HistoryComponent,
    LuckyComponent,
    SearchByIngredientsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
