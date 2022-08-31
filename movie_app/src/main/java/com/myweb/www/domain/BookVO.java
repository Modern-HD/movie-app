package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookVO {
	private String bno;
	private long scno;
	private long mno;
	private long movieId;
	private long pay;
	private int adult;
	private int teenager;
	private int elder;
	private String regAt;
	
	public BookVO(String bno, long scno, long mno, long movieId, long pay, int adult, int teenager, int elder) {
		this.bno = bno;
		this.scno = scno;
		this.mno = mno;
		this.movieId = movieId;
		this.pay = pay;
		this.adult = adult;
		this.teenager = teenager;
		this.elder = elder;
	}
	

}
