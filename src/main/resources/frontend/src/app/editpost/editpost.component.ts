import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostData } from '../EntityInterfaces/entities';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  selectVideoFile!:File|null;
  selectImageFile!:File|null;
  postData!:PostData;

  constructor(private activatedRoute:ActivatedRoute, private postsService:PostsService, private router:Router) {
    this.activatedRoute.params.subscribe(p => {
      this.postsService.getPostById(p['id']).subscribe(data => {
        this.postData = <PostData> data;
      });
    })
  }

  ngOnInit(): void {
  }

  onPhotoSelected(photoSelector:HTMLInputElement) {
    this.selectImageFile = photoSelector.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectImageFile);
    fileReader.addEventListener(
      "loadend",
      e => {
        let readableString = fileReader.result!.toString();
        let postPreviewImage = <HTMLImageElement> document.getElementById("post-preview-img");
        postPreviewImage.src = readableString;
        if (this.selectVideoFile) {
          this.selectVideoFile = null;
        }
      }
    )
  }

  onVideoSelected(videoSelector:HTMLInputElement) {
    this.selectVideoFile = videoSelector.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectVideoFile);
    fileReader.addEventListener(
      "loadend",
      e => {
        let readableString = fileReader.result!.toString();
        let postPreviewVid = <HTMLVideoElement> document.getElementById("post-preview-vid");
        postPreviewVid.src = readableString;
        if (this.selectImageFile) {
          this.selectImageFile = null;
        }
      }
    )
  }

  cancelMedia() {
    this.selectImageFile = null;
    this.selectVideoFile = null;
  }

  onPostClick(titleInput:HTMLInputElement, captionInput:HTMLTextAreaElement) {
    let newTitle = titleInput.value;
    let newCaption = captionInput.value;

    if (newCaption.length == 0 || newTitle.length == 0) {
      alert("Title and caption cannot be empty!");
      return;
    }
    if (this.selectImageFile || this.selectVideoFile) {
      this.updateMediaPost(newTitle, newCaption);
    } else {
      this.updatePost(newTitle, newCaption);
    }
  }

  updateMediaPost(title:string, caption:string) {
    let data:FormData = new FormData();
    let mediaType:string = "";
    if (this.selectImageFile) {
      data.append("resource", this.selectImageFile);
      mediaType = this.selectImageFile.type;
    } else if (this.selectVideoFile) {
      data.append("resource", this.selectVideoFile);
      mediaType = this.selectVideoFile.type;
    }

    let body = {
      title,
      caption,
      mediaType,
    }
    data.append("body", new Blob([JSON.stringify(body)], {type: "application/json"}));

    this.postsService.updatePostWithMedia(this.postData.id, data).subscribe(data => {
      alert("Post successfully updated!");
      this.router.navigate(['posts']);
    });
  }

  updatePost(title:string, caption:string) {
    let body = {
      title,
      caption,
      resource: "",
      mediaType: "",
    }

    this.postsService.updatePostTextOnly(this.postData.id, body).subscribe(data => {
      alert("Post successfully updated!");
      this.router.navigate(['posts']);
    });
  }
}
