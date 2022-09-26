package com.dxc.Service;

import java.util.List;

import com.dxc.Payload.PostDTO;
import com.dxc.Payload.PostDTOBytes;
import com.dxc.Payload.PostResponse;

public interface PostServiceInterface {
	public PostDTO createPost(PostDTO postDto);
	
	public PostResponse getAppPosts(int pageNo, int pageSize, String sortBy, String sortDir);
	
	public PostDTOBytes getPostById(long id);

	public PostDTO updatePostViewCount(long id);
	
	public PostDTO updatePost(PostDTO postDto, long id);
	
	public void deletePost(long postId, long userId);
}
