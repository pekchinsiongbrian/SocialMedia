import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state = AuthenticatorCompState.LOGIN;

  constructor(private bottomSheetRef: MatBottomSheetRef, private userService: UserService, private router:Router, private validationService:ValidationService) {

  }

  ngOnInit(): void {
  }

  onResetPassword() {
    this.state = AuthenticatorCompState.RESET_PASSWORD;
  }

  onForgotPassword() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccount() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER
  }

  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD
  }

  isResetPasswordState() {
    return this.state == AuthenticatorCompState.RESET_PASSWORD
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot password";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.RESET_PASSWORD:
        return "Reset password"
    }
  }

  onRegisterClick(registerName: HTMLInputElement, registerEmail: HTMLInputElement, registerPassword: HTMLInputElement, registerConfirmPassword: HTMLInputElement) {
    let name = registerName.value;
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if (!this.validationService.isNotEmpty(email) ||
      !this.validationService.isNotEmpty(password) ||
      !this.validationService.isNotEmpty(confirmPassword) ||
      !this.validationService.isNotEmpty(name)) {
        alert("All fields must be filled!");
        return;
    }

    if (!this.validationService.validateEmail(email)) {
      alert("Invalid email format detected");
      return;
    }

    if (!this.validationService.isMatch(password, confirmPassword)) {
      alert("Passwords mismatch!");
      return;
    }

    if (!this.validationService.isSufficientLen(password)) {
      alert("Password needs to be at least 6 characters long");
      return;
    }

    const body = {
      name,
      email,
      password,
      roles: [{ "name": "ROLE_USER" }]
    }
    this.userService.createUser(body).subscribe(data => {
      if (data == null) {
        alert("Username already exists. Please try another username!");
      } else {
        alert("Account created! You can now try logging in.");
        this.onLoginClick();
      }
    });
  }

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    let email = loginEmail.value;
    let password = loginPassword.value;

    if (this.validationService.isNotEmpty(email) && 
    this.validationService.isNotEmpty(password)) {
      const body = {
        email,
        password
      }
      this.userService.login(body).subscribe(data => {
        let res = JSON.parse(JSON.stringify(data));
        if (res.error == null) {
          this.bottomSheetRef.dismiss();
          let user = {
            "id": res.id,
            "email": res.email,
            "role": res.roles[0].name,
            "name": res.name
          }
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(['/posts']);
        } else {
          if (res.error == "username") {
            alert("No such username!");
          } else {
            alert("Incorrect password!");
          }
        }
      })
    }
  }

  onForgotPasswordClick(resetEmail: HTMLInputElement) {
    let email = resetEmail.value;
    if (!this.validationService.validateEmail(email)) {
      alert("Invalid email format detected");
      return;
    }

    let body = {
      email
    }
    this.userService.resetForgottenPassword(body).subscribe(data => {
      alert(`An email has been sent to ${email} with a temporary password.\n\nFor your security, you should reset your password as soon as possible.`);
      this.onResetPassword();
    })
  }

  onResetPasswordClick(emailInput:HTMLInputElement, oldPasswordInput:HTMLInputElement, newPasswordInput:HTMLInputElement, confirmNewPasswordInput:HTMLInputElement) {
    let email  = emailInput.value;
    let oldPassword = oldPasswordInput.value;
    let newPassword = newPasswordInput.value;
    let confirmNewPassword = confirmNewPasswordInput.value;

    if (!this.validationService.isNotEmpty(email) &&
      !this.validationService.isNotEmpty(oldPassword) &&
      !this.validationService.isNotEmpty(newPassword) &&
      !this.validationService.isNotEmpty(confirmNewPassword)) {
        alert("All fields must be filled!");
        return;
    }

    if (!this.validationService.validateEmail(email)) {
      alert("Invalid email format detected");
      return;
    }

    if (!this.validationService.isMatch(newPassword, confirmNewPassword)) {
      alert("New passwords mismatch!");
      return;
    }

    if (!this.validationService.isSufficientLen(newPassword)) {
      alert("Password needs to be at least 6 characters long");
      return;
    }

    let body = {
      email,
      oldPassword,
      newPassword
    }
    this.userService.resetKnownPassword(body).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if (res.error == null) {
        alert("Your password has been reset. Try logging in!");
        this.onLoginClick();
      } else {
        if (res.error == "username") {
          alert("No such username!");
        } else {
          alert("Incorrect password!");
        }
      }
    });
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD
}