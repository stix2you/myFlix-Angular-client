import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
//import { FavoritesComponent } from './favorites/favorites.component'; // Assume this component exists
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
   { path: 'movies', component: MovieCardComponent },
   { path: 'profile', component: UserProfileComponent },
  // { path: 'favorites', component: FavoritesComponent },
   { path: 'welcome', component: WelcomePageComponent },
   { path: '', redirectTo: 'movies', pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }