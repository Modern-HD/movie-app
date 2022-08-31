package com.myweb.www.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchDTO {
	private long tno;
	private long rno;
	private long movieId;
	private String date;
	
	private long scno;
	private int x;
	private String y;
	private boolean valid;
}
