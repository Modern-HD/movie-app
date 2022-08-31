package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ScheduleVO {
	private long scno;
	private long rno;
	private long tno;
	private String startTime;
	private String endTime;
	private long movieId;
	private boolean timeDiscount;
}
