package com.dxc.Controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dxc.Payload.PostDTO;
import com.dxc.Payload.PostDTOBytes;
import com.dxc.Payload.PostResponse;
import com.dxc.Service.PostServiceInterface;
import com.dxc.utils.AppConst;
import com.dxc.utils.FileUploadUtil;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/posts")
public class PostController {
	@Autowired
	private PostServiceInterface postService;

	// create post
	@PostMapping("/uploadWithMedia")
	public ResponseEntity<PostDTO> createMediaPost(@RequestPart("body") PostDTO postDto,
			@RequestPart("resource") MultipartFile multipartFile) throws IOException {
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		postDto.setResource(fileName);
		
		String uploadDir = "C:/Users/psiongbrian/Downloads/SocialMedia/user-media/" + postDto.getUserId();
		FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
		
		return new ResponseEntity<PostDTO>(postService.createPost(postDto), HttpStatus.CREATED);
	}

	@PostMapping("/uploadTextOnly")
	public ResponseEntity<PostDTO> createTextOnlyPost(@RequestBody PostDTO postDto) {
		return new ResponseEntity<PostDTO>(postService.createPost(postDto), HttpStatus.CREATED);
	}

	// get all posts
	@GetMapping
	public PostResponse getAllBlobs(
			@RequestParam(value = "pageNo", defaultValue = AppConst.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
			@RequestParam(value = "pageSize", defaultValue = AppConst.DEFAULT_PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConst.DEFAULT_SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConst.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
		return postService.getAppPosts(pageNo, pageSize, sortBy, sortDir);
	}

	// get post by id
	@GetMapping("/{id}")
	public ResponseEntity<PostDTOBytes> getPostById(@PathVariable(name = "id") long id) {
		return ResponseEntity.ok(postService.getPostById(id));
	}

	// update post view count by id
	@PostMapping("/{id}")
	public ResponseEntity<PostDTO> updatePostViewCount(@PathVariable(name = "id") long id) {
		PostDTO postResponse = postService.updatePostViewCount(id);
		return new ResponseEntity<PostDTO>(postResponse, HttpStatus.OK);
	}
	
	// update post by id
	@PutMapping("/updateTextOnly/{id}")
	public ResponseEntity<PostDTO> updatePostTextOnly(@RequestBody PostDTO postDto, @PathVariable(name = "id") long id) {
		PostDTO postResponse = postService.updatePost(postDto, id);
		return new ResponseEntity<PostDTO>(postResponse, HttpStatus.OK);
	}
	
	@PutMapping("/updateWithMedia/{id}")
	public ResponseEntity<PostDTO> updatePostWithMedia(@RequestPart("body") PostDTO postDto,
			@RequestPart("resource") MultipartFile multipartFile, @PathVariable(name = "id") long id) throws IOException {
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		postDto.setResource(fileName);
		
		String uploadDir = "C:/Users/psiongbrian/OneDrive - DXC Production/Documents/DevDrv/Angular/project-socials/social-media/user-media/" + postDto.getUserId();
		FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
		PostDTO postResponse = postService.updatePost(postDto, id);
		return new ResponseEntity<PostDTO>(postResponse, HttpStatus.OK);
	}

	// delete post by id
	@DeleteMapping("/{userId}/{postId}")
	public void deletePost(@PathVariable(name = "userId") long userId, @PathVariable(name = "postId") long postId) {
		postService.deletePost(postId, userId);
//		return new ResponseEntity<String>("Post entity deleted successfully", HttpStatus.OK);
	}
}
