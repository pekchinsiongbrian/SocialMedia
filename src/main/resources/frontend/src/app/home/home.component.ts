import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from '../authenticator/authenticator.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginsheet:MatBottomSheet, private userService:UserService) { }

  ngOnInit(): void {
  }

  getStarted() {
    this.loginsheet.open(AuthenticatorComponent);
  }

  loggedIn() {
    return this.userService.getUser() != null;
  }
}
