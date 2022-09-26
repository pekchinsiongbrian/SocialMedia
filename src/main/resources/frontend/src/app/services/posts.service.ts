import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = "http://localhost:8080/api/posts";

  constructor(private httpClient:HttpClient, private router:Router) { }

  createTextOnlyPost(data:any): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/uploadTextOnly", data);
  }

  createMediaPost(data:any): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/uploadWithMedia", data);
  }

  getPosts(pageNo:number): Observable<Object> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageNo", pageNo);
    return this.httpClient.get(this.baseUrl, { params: queryParams });
  }

  getPostById(id:number): Observable<Object> {
    return this.httpClient.get(this.baseUrl + "/" + id);
  }

  incrementViewCount(id:number): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/" + id, null);
  }

  deletePost(postId:number, userId:number): Observable<Object> {
    return this.httpClient.delete(this.baseUrl + "/" + userId + "/" + postId);
  }

  updatePostWithMedia(id:number, data:any) {
    return this.httpClient.put(this.baseUrl + "/updateWithMedia/" + id, data);
  }

  updatePostTextOnly(id:number, data:any) {
    return this.httpClient.put(this.baseUrl + "/updateTextOnly/" + id, data);
  }
}
