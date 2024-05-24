import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
   { path: 'movies', component: MovieCardComponent },
   { path: 'profile', component: UserProfileComponent },
   { path: 'favorites', component: FavoriteMoviesComponent },
   { path: 'welcome', component: WelcomePageComponent },
   { path: 'movie/:title', component: MovieDetailComponent },
   { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
   providers: [{ provide: APP_BASE_HREF, useValue: '/myFlix-Angular-client/' }]  // this is to fix the issue of the app not loading on github pages
})
export class AppRoutingModule { }