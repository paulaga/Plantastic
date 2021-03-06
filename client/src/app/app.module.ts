import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile/profile.component';
import { MyPlantsComponent } from './my-plants/my-plants.component';
import { plantsService } from '../services/plants.service';
import { OnePlantComponent } from './one-plant/one-plant.component';
import { TipsComponent } from './tips/tips.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { wishService } from '../services/wish.service';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { notifService } from '../services/notif.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PlaylistComponent } from './playlist/playlist.component';
import { playListService } from '../services/play.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    MyPlantsComponent,
    OnePlantComponent,
    TipsComponent,
    WishListComponent,
    PlaylistComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FileUploadModule
  ],
  providers: [SessionService, plantsService, wishService, notifService, playListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
