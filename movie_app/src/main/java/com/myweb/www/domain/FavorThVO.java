package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavorThVO {
	private long fno;
	private long mno;
	private long tno;
	private String tname;
	
	
	public FavorThVO(long mno, long tno) {
		this.mno = mno;
		this.tno = tno;
	}
}