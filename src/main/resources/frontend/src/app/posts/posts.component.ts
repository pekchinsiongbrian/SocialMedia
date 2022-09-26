import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  selectImageFile!:File|null;
  selectVideoFile!:File|null;
  charCount:number = 0;

  constructor(private dialog:MatDialogRef<PostsComponent>, private postsService:PostsService, private userService:UserService) { }

  ngOnInit(): void {
  }

  updateCharCount(captionInput:HTMLTextAreaElement) {
    this.charCount = captionInput.value.length;
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
    let title = titleInput.value;
    let caption = captionInput.value;

    if (caption.length == 0 || title.length == 0) {
      alert("Title and caption cannot be empty!");
      return;
    }

    if (title.length > 20) {
      alert("Title should be 20 characters or less");
      return;
    }

    if (caption.length > 50) {
      alert("Caption should be 50 characters or less");
      return;
    }

    if (this.selectImageFile || this.selectVideoFile) {
      this.uploadMediaPost(title, caption);
    } else {
      this.uploadPost(title, caption);
    }
  }

  uploadMediaPost(title:string, caption:string) {
    let id = this.userService.getUserId();

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
      viewCount: 0,
      createdDate: new Date(),
      mediaType,
      userId: id
    }
    data.append("body", new Blob([JSON.stringify(body)], {type: "application/json"}));

    this.postsService.createMediaPost(data).subscribe(data => {
      alert("Post successfully created!");
      this.dialog.close();
      location.reload();
    });
  }

  uploadPost(title:string, caption:string) {
    let id = this.userService.getUserId();
    let body = {
      title,
      caption,
      viewCount: 0,
      createdDate: new Date(),
      resource: "",
      mediaType: "",
      userId: id
    }

    this.postsService.createTextOnlyPost(body).subscribe(data => {
      alert("Post successfully created!");
      this.dialog.close();
      location.reload();
    });
  }
}
