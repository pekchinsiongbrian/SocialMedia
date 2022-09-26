package com.dxc.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dxc.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	List<Post> findAllByUserId(long user_id);
}
