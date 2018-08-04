import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile/profile.component';
import { MyPlantsComponent } from './my-plants/my-plants.component';
import { plantsService } from '../services/plants.service';
import { OnePlantComponent } from './one-plant/one-plant.component';
import { TipsComponent } from './tips/tips.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { wishService } from '../services/wish.service';
import { FileSelectDirective } from 'ng2-file-upload';

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
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
  ],
  providers: [SessionService, plantsService, wishService],
  bootstrap: [AppComponent]
})
export class AppModule { }
