package com.dxc.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.Payload.LoginDTO;
import com.dxc.Payload.ResetPasswordDTO;
import com.dxc.Payload.UserDTO;
import com.dxc.Service.UserServiceInterface;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("api/users")
public class UserController {
	@Autowired
	private UserServiceInterface userService;
	
	// create user
	@PostMapping
	public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDto) {
		return new ResponseEntity<UserDTO>(userService.createUser(userDto), HttpStatus.CREATED);
	}
	
	// get user by id
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable(name="id") long id) {
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	// get all users
	@GetMapping
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginDTO> login(@RequestBody UserDTO userDto) {
		return ResponseEntity.ok(userService.login(userDto));
	}
	
	// update user by id
	@PutMapping("/{id}")
	public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDto, @PathVariable(name="id") long id) {
		UserDTO userResponse = userService.updateUser(userDto, id);
		return new ResponseEntity<UserDTO>(userResponse, HttpStatus.OK);
	}
	
	// reset known password
	@PutMapping("/reset_password")
	public ResetPasswordDTO resetKnownPassword(@RequestBody ResetPasswordDTO resetPwDto) {
		return userService.resetKnownPassword(resetPwDto.getEmail(), resetPwDto.getOldPassword(), resetPwDto.getNewPassword());
	}
	
	// delete user by id
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable(name="id") long id) {
		userService.deleteUser(id);
//		return ResponseEntity.ok("User entity deleted successfully");
	}
}
