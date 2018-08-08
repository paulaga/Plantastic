import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OnePlantComponent } from './one-plant/one-plant.component';
import { MyPlantsComponent } from './my-plants/my-plants.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PlaylistComponent } from './playlist/playlist.component';

export const routes: Routes = [
  { path:'signup', component: SignupComponent },
  { path:'login', component: LoginComponent },
  { path:'profile', component: ProfileComponent,
    children: [
      { path: '', component: MyPlantsComponent},
      { path: 'plants/:id', component: OnePlantComponent},
      { path: 'wishlist', component: WishListComponent},
      { path: 'playlist', component: PlaylistComponent}
    ]
  }
];
