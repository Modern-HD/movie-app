package com.myweb.www.repository;

import java.util.List;
import java.util.Map;

import com.myweb.www.domain.BookVO;
import com.myweb.www.domain.MovieVO;
import com.myweb.www.domain.SearchDTO;

public interface MovieDAO {
	public List<MovieVO> selectTicketList(SearchDTO schdto);
	public MovieVO selectOneFromMovieId(long movieId);
	public List<MovieVO> selectMovieList();
	public MovieVO selectMovieDetail(long movieId);
	public String selectLink(long movieId);
	public int updateTicket(BookVO bvo);
}
