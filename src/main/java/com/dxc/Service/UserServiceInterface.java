package com.dxc.Service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.dxc.Payload.LoginDTO;
import com.dxc.Payload.ResetPasswordDTO;
import com.dxc.Payload.UserDTO;

public interface UserServiceInterface extends UserDetailsService {
	public UserDTO createUser(UserDTO userDto);
	
	public UserDTO getUserById(long id);
	
	public List<UserDTO> getAllUsers();

	public UserDTO updateUser(UserDTO userDto, long id);
	
	public void resetForgottenPassword(String email, String password);
	
	public ResetPasswordDTO resetKnownPassword(String email, String oldPassword, String newPassword);
	
	public void deleteUser(long id);
	
	public LoginDTO login(UserDTO userDto);
}
