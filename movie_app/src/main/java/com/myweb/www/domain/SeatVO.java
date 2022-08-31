package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatVO {
	private String sid;
	private long scno;
	private boolean status;
	private boolean valid;
	private int price;
	private int adult;
	private int teenager;
	private int elder;
	private String reg_at;
	
	public SeatVO(String sid, long scno) {
		this.sid = sid;
		this.scno = scno;
	}
}
