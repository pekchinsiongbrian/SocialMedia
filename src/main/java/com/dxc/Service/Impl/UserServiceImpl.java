package com.dxc.Service.Impl;

import com.dxc.Payload.LoginDTO;
import com.dxc.Payload.ResetPasswordDTO;
import com.dxc.Payload.UserDTO;
import com.dxc.Repository.UserRepository;
import com.dxc.Service.UserServiceInterface;
import com.dxc.entity.Role;
import com.dxc.entity.User;
import com.dxc.exception.ResourceNotFoundException;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserServiceInterface {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	// convert entity to DTO (for security and protocol reasons)
	private UserDTO mapToDto(User user) {
		UserDTO userDto = new UserDTO();
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setEmail(user.getEmail());
		userDto.setPassword(passwordEncoder.encode(user.getPassword()));
		userDto.setRoles(user.getRoles());
		
		return userDto;
	}
	
	// convert DTO to entity
	public User mapToEntity(UserDTO userDto) {
		User user = new User();
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		user.setRoles(userDto.getRoles());
		
		return user;
	}
	
	// implementing create user
	public UserDTO createUser(UserDTO userDto) {
		// convert DTO to entity
		User user = mapToEntity(userDto);
		try {
			User newUser = userRepository.save(user);
			
			// convert entity to DTO
			UserDTO userResponse = mapToDto(newUser);
			return userResponse;
		} catch (Exception e) {
			return null;
		}
	}
	
	// implementing get user by id
	public UserDTO getUserById(long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("USER", "id", id));
		
		return mapToDto(user);
	}
	
	// implementing get all users
	public List<UserDTO> getAllUsers() {
		List<User> users = userRepository.findAll();
		List<UserDTO> userDtoList = users.stream().map(user -> {
			UserDTO userDto = mapToDto(user);
			userDto.setPassword(null);
			return userDto;
		}).toList();
		
		return userDtoList;
	}
	
	// implementing update user
	public UserDTO updateUser(UserDTO userDto, long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("USER", "id", id));
		user.setName(userDto.getName());
		
		User updatedUser = userRepository.save(user);
		
		return mapToDto(updatedUser);
	}
	
	// reset forgotten user password
	public void resetForgottenPassword(String email, String password) {
		User user = userRepository.findByEmail(email);
		user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);
	}
	
	// reset known user password
	public ResetPasswordDTO resetKnownPassword(String email, String oldPassword, String newPassword) {
		ResetPasswordDTO resetPwDto = new ResetPasswordDTO();
		try {
			UserDetails userDetails = loadUserByUsername(email);
			if (passwordEncoder.matches(oldPassword, userDetails.getPassword())) {
				resetForgottenPassword(email, newPassword);
				resetPwDto.setError(null);
			} else {
				resetPwDto.setError("password");
			}
		} catch(UsernameNotFoundException e) {
			resetPwDto.setError("username");
		}
		return resetPwDto;
	}
	
	// implementing delete user
	public void deleteUser(long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("USER", "id", id));
		userRepository.delete(user);
	}

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { // used during user login
		User user = userRepository.findByEmail(username);
		if(user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(
				user.getEmail(),
				user.getPassword(),
				mapRolesToAuthorities(user.getRoles())
				);
	}
	
	private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles){
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
	}
	
	public LoginDTO login(UserDTO userDto) {
		LoginDTO loginDto = new LoginDTO();
		try {
			UserDetails userDetails = loadUserByUsername(userDto.getEmail());
			if (passwordEncoder.matches(userDto.getPassword(), userDetails.getPassword())) {
				long userId = userRepository.findByEmail(userDto.getEmail()).getId();
				UserDTO fullUserDto = getUserById(userId);
				loginDto.setError(null);
				loginDto.setId(userId);			
				loginDto.setName(fullUserDto.getName());
				loginDto.setEmail(fullUserDto.getEmail());
				loginDto.setRoles(fullUserDto.getRoles());
				
				return loginDto;
			} else {
				loginDto.setError("password");
			}
		} catch(UsernameNotFoundException e) {
			loginDto.setError("username");
		}
		return loginDto;		
	}
}
