package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TheaterVO {
	private long tno;
	private String tname;
	private int region;
	private String addr;
	private String description;
	private int showType;
	private int totalSeat;
	private int totalRoom;
}
