import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-media';

  constructor(private loginsheet:MatBottomSheet, private userService:UserService, private router:Router) {
  }

  getName() {
    return this.userService.getName();
  }

  getEmail() {
    return this.userService.getEmail();
  }

  getRole() {
    return this.userService.getCleanRole(); 
  }

  isAdmin() {
    return this.getRole() == "ADMIN";
  }

  loggedIn() {
    let user = localStorage.getItem("user");
    return user != null;
  }

  loginClick() {
    this.loginsheet.open(AuthenticatorComponent);
  }

  logoutClick() {
    alert("Successfully logged out!");
    localStorage.clear();
    this.router.navigate(['']);
  }

  homeClick() {
    this.router.navigate(['']);
  }

  postsClick() {
    this.router.navigate(['posts']);
  }

  manageUsers() {
    this.router.navigate(['manage_users']);
  }
}
