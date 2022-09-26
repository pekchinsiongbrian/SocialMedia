package com.dxc.Payload;

import java.util.Date;

import com.dxc.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
	private long id;
	private String title;
	private String resource;
	private String mediaType;
	private String caption;
	private int viewCount;
	private long userId;
	private Date createdDate;
}
