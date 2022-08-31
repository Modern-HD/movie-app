package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomVO {
	private long rno;
	private long tno;
	private String rname;
	private boolean showType;
	private long movieId;
	private String special;
	private int width;
	private int height;
	private int pathX1;
	private int pathX2;
	private int pathY1;
	private int pathY2;
}
