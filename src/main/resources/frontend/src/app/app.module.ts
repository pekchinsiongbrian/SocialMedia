import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { PostsComponent } from './posts/posts.component';
import { DisplaypostComponent } from './displaypost/displaypost.component';
import { HttpClientModule } from '@angular/common/http';
import { EditpostComponent } from './editpost/editpost.component';
import { IndivpostComponent } from './indivpost/indivpost.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { AbsoluteUrlPipe } from './pipes/absoluteurl.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    PostfeedComponent,
    PostsComponent,
    DisplaypostComponent,
    EditpostComponent,
    IndivpostComponent,
    ManageusersComponent,
    AbsoluteUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
