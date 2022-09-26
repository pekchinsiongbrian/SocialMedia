package com.dxc.Payload;

import java.util.Collection;

import org.springframework.security.core.userdetails.UserDetails;

import com.dxc.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
	private long id;
	private String error;
	private String email;
	private Collection<Role> roles;
	private String name;
}
