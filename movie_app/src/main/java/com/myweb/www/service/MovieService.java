package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.MovieVO;

public interface MovieService {
	List<MovieVO> MovieList();
	MovieVO MovieDetail(long movieId);
	String getLink(long movieId);
}
