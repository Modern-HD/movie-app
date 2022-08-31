package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieVO {
	private long movieId;
	private String movieNm;
	private int showTm;
	private String openDt;
	private boolean prdtStatNm;
	private long ticket;
	private int ranking;
	private String content;
	private String rate;
	private String trailLink;
	
}
