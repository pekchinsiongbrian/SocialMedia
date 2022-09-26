import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080/api/users";

  constructor(private httpClient:HttpClient, private router:Router) { }

  createUser(body:any): Observable<Object> {
    return this.httpClient.post(this.baseUrl, body)
  }

  login(body:any): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/login", body);
  }

  getUser() {
    return localStorage.getItem("user");
  }

  getUserId() {
    return JSON.parse(<string> localStorage.getItem("user")).id;
    // return user != null ? JSON.parse(user).id : 0;
  }

  getEmail() {
    return JSON.parse(<string> localStorage.getItem("user")).email;
    // return user == null ? "" : JSON.parse(user).email;
  }

  getName() {
    return JSON.parse(<string> localStorage.getItem("user")).name;
    // return user == null ? "" : JSON.parse(user).name;
  }

  getRole() {
    return JSON.parse(<string> localStorage.getItem("user")).role;
    // return user == null ? "" : JSON.parse(user).role;
  }

  getCleanRole() {
    return this.getRole().substring(5);
  }

  getAllUsers() {
    return this.httpClient.get(this.baseUrl);
  }

  updateUser(id:number, data:any): Observable<Object> {
    return this.httpClient.put(this.baseUrl + "/" + id, data);
  }

  deleteUser(id:number) {
    return this.httpClient.delete(this.baseUrl + "/" + id);
  }

  resetForgottenPassword(body:any) {
    return this.httpClient.post("http://localhost:8080/api/email", body);
  }

  resetKnownPassword(body:any) {
    return this.httpClient.put(this.baseUrl + "/reset_password", body);
  }
}
