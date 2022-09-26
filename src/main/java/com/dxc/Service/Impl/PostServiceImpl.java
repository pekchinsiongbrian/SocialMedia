package com.dxc.Service.Impl;

import com.dxc.Payload.PostDTO;
import com.dxc.Payload.PostDTOBytes;
import com.dxc.Payload.PostResponse;
import com.dxc.Payload.UserDTO;
import com.dxc.Repository.PostRepository;
import com.dxc.Service.PostServiceInterface;
import com.dxc.entity.Post;
import com.dxc.exception.ResourceNotFoundException;
import com.dxc.utils.FileDeleteUtil;
import com.dxc.utils.FileDownloadUtil;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostServiceInterface {
	
	@Autowired
	private PostRepository postRepository;
	
	// convert entity to DTO (for security and protocol reasons)
	private PostDTO mapToDto(Post post) {
		PostDTO postDto = new PostDTO();
		postDto.setId(post.getId());
		postDto.setTitle(post.getTitle());
		postDto.setResource(post.getResource());
		postDto.setMediaType(post.getMediaType());
		postDto.setCaption(post.getCaption());
		postDto.setViewCount(post.getViewCount());
		postDto.setUserId(post.getUserId());
		postDto.setCreatedDate(post.getCreatedDate());
		
		return postDto;
	}
	
	// convert DTO to entity
	public Post mapToEntity(PostDTO postDto) {
		Post post = new Post();
		post.setTitle(postDto.getTitle());
		post.setResource(postDto.getResource());
		post.setMediaType(postDto.getMediaType());
		post.setCaption(postDto.getCaption());
		post.setViewCount(postDto.getViewCount());
		post.setUserId(postDto.getUserId());
		post.setCreatedDate(postDto.getCreatedDate());
		
		return post;
	}
	
	public PostDTOBytes mapPostToBytesDto(Post post) {
		PostDTOBytes postDtoBytes = new PostDTOBytes();
		
		postDtoBytes.setId(post.getId());
		postDtoBytes.setTitle(post.getTitle());
		postDtoBytes.setMediaType(post.getMediaType());
		postDtoBytes.setCaption(post.getCaption());
		postDtoBytes.setViewCount(post.getViewCount());
		postDtoBytes.setUserId(post.getUserId());
		postDtoBytes.setCreatedDate(post.getCreatedDate());
		
		if (!post.getMediaType().equals("")) {
			postDtoBytes.setResource(FileDownloadUtil.getFileBytes(post.getResource(), post.getUserId()));
		} else {
			postDtoBytes.setResource(null);
		}
		
		return postDtoBytes;
	}
	
	// implementing create post
	public PostDTO createPost(PostDTO postDto) {
		// convert DTO to entity
		Post post = mapToEntity(postDto);
		Post newPost = postRepository.save(post);
		
		// convert entity to DTO
		PostDTO postResponse = mapToDto(newPost);
		return postResponse;
	}
	
	// implementing get post
	public PostResponse getAppPosts(int pageNo, int pageSize, String sortBy, String sortDir) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) 
				? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
		Page<Post> posts = postRepository.findAll(pageable);
		
		// get content from page object
		List<Post> listOfPosts = posts.getContent();
		
		List<PostDTOBytes> content = listOfPosts.stream()
				.map(postDto -> mapPostToBytesDto(postDto))
				.collect(Collectors.toList());
		
		PostResponse postResponse = new PostResponse();
		postResponse.setContent(content);
		postResponse.setPageNo(posts.getNumber());
		postResponse.setPageSize(posts.getSize());
		postResponse.setTotalElement(posts.getTotalElements());
		postResponse.setTotalPages(posts.getTotalPages());
		postResponse.setLast(posts.isLast());
		
		return postResponse;
	}
	
	// implementing get post by id
	public PostDTOBytes getPostById(long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("POST", "id", id));
		
		return mapPostToBytesDto(post);
	}
	
	//implementing update post view count
	public PostDTO updatePostViewCount(long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("POST", "id", id));
		post.setViewCount(post.getViewCount() + 1);

		Post updatedPost = postRepository.save(post);
		return mapToDto(updatedPost);
	}
	
	//implementing update post view count
		public PostDTO updatePost(PostDTO postDto, long id) {
			Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("POST", "id", id));
			post.setTitle(postDto.getTitle());
			post.setCaption(postDto.getCaption());
			post.setResource(postDto.getResource());
			post.setMediaType(postDto.getMediaType());
			
			Post updatedPost = postRepository.save(post);
			return mapToDto(updatedPost);
		}
	
	// implementing delete post
	public void deletePost(long postId, long userId) {
		Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("POST", "id", postId));
		String resourceToDelete = post.getResource();
		if (!resourceToDelete.equals("")) {
			List<String> resources = getAllResourcesByUserId(userId);
			FileDeleteUtil.deleteFile(userId, resourceToDelete, resources);
		}
		postRepository.delete(post);
	}
	
	public List<String> getAllResourcesByUserId(long userId) {
		List<Post> posts = postRepository.findAllByUserId(userId);
		return posts.stream().map(post -> post.getResource()).filter(Predicate.not(String::isEmpty)).toList();
	}
}
