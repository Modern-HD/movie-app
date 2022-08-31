package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentVO {
	private long cno;
	private long movieId;
	private String content;
	private int rate;
	private String writer;
	private String regAt;
	private String modAt;
}
