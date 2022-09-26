package com.dxc.Payload;

import java.util.Collection;

import com.dxc.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	private long id;
	private String name;
	private String email;
	private String password;
	private Collection<Role> roles;
}
