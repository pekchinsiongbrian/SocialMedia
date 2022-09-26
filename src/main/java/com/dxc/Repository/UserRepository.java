package com.dxc.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dxc.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
}
