package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayDTO {
	private String seats;
	private long scno;
	private long mno;
	private int pay;
	private int adult;
	private int teenager;
	private int elder;
	private long movieId;

	private ScheduleVO scvo;
	private TheaterVO tvo;
	private RoomVO rvo;
	private MovieVO movo;
	
	public PayDTO(ScheduleVO scvo, TheaterVO tvo, RoomVO rvo, MovieVO movo) {
		this.scvo = scvo;
		this.tvo = tvo;
		this.rvo = rvo;
		this.movo = movo;
	}
	
	
}
