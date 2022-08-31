package com.myweb.www.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TheaterDTO {
	private List<RoomVO> rooms;
	private TheaterVO tvo;
	
	public TheaterDTO(List<RoomVO> rooms, TheaterVO tvo) {
		this.rooms = rooms;
		this.tvo = tvo;
	}
}
