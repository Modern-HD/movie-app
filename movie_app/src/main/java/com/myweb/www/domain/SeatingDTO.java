package com.myweb.www.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatingDTO {
	private MovieVO movo;
	private TheaterVO tvo;
	private RoomVO rvo;
	private ScheduleDTO scdto;
	private List<SeatVO> svoList;
}
