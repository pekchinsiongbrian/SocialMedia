import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../EntityInterfaces/entities';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  users:User[] = [];
  mode:Mode = Mode.VIEWING;
  userToEdit:number = 0;
  @ViewChild('nameInput') nameInput!:ElementRef;
  
  constructor(private userService:UserService, private validationService:ValidationService) {
    userService.getAllUsers().subscribe(data => {
      let userJson = JSON.parse(JSON.stringify(data));
      userJson.forEach((user:any) => {
        this.users.push(<User> user);
      })
    });
  }

  ngOnInit(): void {
  }

  isSelf(id:number):boolean {
    return this.userService.getUserId() == id;
  }

  back() {
    this.mode = Mode.VIEWING;
    this.userToEdit = 0;
  }

  saveChanges(id:number, oldName:string) {
    let newName = this.nameInput.nativeElement.value;

    if (!this.validationService.isNotEmpty(newName)) {
      alert("Name cannot be empty!");
      return;
    }

    let data = {
      name: newName
    }
    this.userService.updateUser(id, data).subscribe(data => {
      alert(`Updated user ${id}'s name from ${oldName} to ${newName}`);
      this.back();
      location.reload();
      let user = JSON.parse(<string> localStorage.getItem("user"));
      user.name = newName;
      localStorage.setItem("user", JSON.stringify(user));
    });
  }

  isEditMode() {
    return this.mode == Mode.EDITING;
  }

  editUser(id:number) {
    this.mode = Mode.EDITING;
    this.userToEdit = id;
  }

  deleteUser(id:number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe(data => {
        alert("User deleted!");
        location.reload();
      });
    }
  }
}

enum Mode {
  VIEWING,
  EDITING
}