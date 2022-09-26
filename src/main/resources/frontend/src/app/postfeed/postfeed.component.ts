import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostsComponent } from '../posts/posts.component';
import { PostsService } from '../services/posts.service';
import { PostData } from '../EntityInterfaces/entities';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {
  posts:PostData[] = [];
  pageNo:number = 0;
  isLast:boolean = false;
  isEmpty:boolean = this.posts.length == 0;

  constructor(private dialog:MatDialog, private postsService:PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick() {
    this.dialog.open(PostsComponent);
  }

  getPosts() {
    this.postsService.getPosts(this.pageNo).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.content.forEach((post: PostData) => {
        this.posts.push(post);
      });
      let jsonData = JSON.parse(JSON.stringify(data));
      if (!jsonData.last) {
        this.pageNo += 1;
      } else {
        this.isLast = true;
      }
    });
  }
}
