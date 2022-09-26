import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostData } from '../EntityInterfaces/entities';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-displaypost',
  templateUrl: './displaypost.component.html',
  styleUrls: ['./displaypost.component.css']
})
export class DisplaypostComponent implements OnInit {

  @Input() postData!:PostData;

  userId:number;
  role:string
  constructor(private userService:UserService, private router:Router, private postsService:PostsService, private validationService:ValidationService) {
    this.userId = this.userService.getUserId();
    this.role = this.userService.getCleanRole();
  }

  ngOnInit(): void {
  }

  showIcons():boolean {
    return this.postData.userId == this.userId || this.role == "ADMIN";
  }

  displayPost() {
    let url = 'posts/' + this.postData.id;
    this.router.navigate([url]);
  }

  editPost() {
    let url = 'posts/edit/' + this.postData.id;
    this.router.navigate([url]);
  }
  
  deletePost() {
    if (confirm("Are you sure you want to delete this post?")) {
      this.postsService.deletePost(this.postData.id, this.userId).subscribe(data => {
        alert("Post deleted!");
        location.reload();
      });
    }
  }

  isLink() {
    return this.validationService.isValidUrl(this.postData.caption);
  }
}
