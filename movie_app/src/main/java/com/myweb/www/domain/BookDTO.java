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
public class BookDTO {
	private BookVO bvo;
	private List<BSeatVO> bsvoList;
	private MovieVO mvo;
	private ScheduleVO scvo;
	private String tname;
}
