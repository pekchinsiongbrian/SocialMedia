export interface PostData {
    id:number,
    title:string,
    caption:string,
    viewCount:number,
    createdDate:Date,
    userId:number,
    resource:any[],
    mediaType:string
}

export interface User {
    id:number,
    email:string,
    roles:any[],
    name:string
}