import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostData } from '../EntityInterfaces/entities';
import { PostsService } from '../services/posts.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-indivpost',
  templateUrl: './indivpost.component.html',
  styleUrls: ['./indivpost.component.css']
})
export class IndivpostComponent implements OnInit {

  postData!:PostData;

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private postsService:PostsService, private validationService:ValidationService) {
    this.activatedRoute.params.subscribe(p => {
      this.postsService.getPostById(p['id']).subscribe(data => {
        this.postData = <PostData> data;
        this.postData.viewCount += 1;
        this.postsService.incrementViewCount(p['id']).subscribe(d => {
          // console.log(d);
        });
      })
    });
  }

  ngOnInit(): void {
  }

  isLink() {
    return this.validationService.isValidUrl(this.postData.caption);
  }
}
