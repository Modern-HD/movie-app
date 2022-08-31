package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.DateDTO;
import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MovieVO;
import com.myweb.www.domain.PayDTO;
import com.myweb.www.domain.SeatingDTO;
import com.myweb.www.domain.TheaterVO;

public interface BookService {
	public List<DateDTO> getDateList(long tno, Long movieId);
	public SeatingDTO getSeatList(long scno);
	public List<TheaterVO> getTheaterList(Long movieId);
	public List<TheaterVO> getTheaterListAll();
	public List<TheaterVO> getSpecialList(Long movieId);
	public List<FavorThVO> getMyTheaterList(long mno);
	public List<MovieVO> getMovieList();
	public String register(PayDTO pydto, List<String> sidList);
	public PayDTO getPydto(long scno);
}
