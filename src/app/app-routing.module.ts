import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

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
   exports: [RouterModule]
})
export class AppRoutingModule { }