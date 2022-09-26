package com.dxc.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.Payload.UserDTO;
import com.dxc.Service.EmailServiceInterface;
import com.dxc.Service.UserServiceInterface;
import com.dxc.utils.RandomPasswordGenerator;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/email")
public class EmailController {
	@Autowired
	private EmailServiceInterface emailService;
	
	@Autowired
	private UserServiceInterface userService;
	
	// create email
	@PostMapping
	public void sendEmail(@RequestBody UserDTO userDto) {
		String newPassword = RandomPasswordGenerator.generateRandomPassword();
		String email = userDto.getEmail();
		
		userService.resetForgottenPassword(email, newPassword);
		
		emailService.sendEmail(email, "Reset Password", "Your new password is: " + newPassword);
	}
}
