package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BSeatVO {
	private long bsno;
	private String sid;
	private String bno;
	
	public BSeatVO(String sid, String bno) {
		this.sid = sid;
		this.bno = bno;
	}
}
