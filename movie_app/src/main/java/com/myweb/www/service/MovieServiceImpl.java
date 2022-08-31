package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.MovieVO;
import com.myweb.www.repository.MovieDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MovieServiceImpl implements MovieService {
	
	@Inject
	private MovieDAO mdao;
	
	@Override
	public List<MovieVO> MovieList() {

		return mdao.selectMovieList();
	}

	@Override
	public MovieVO MovieDetail(long movieId) {
		return mdao.selectMovieDetail(movieId);
	}
	
	@Override
	public String getLink(long movieId) {
		return mdao.selectLink(movieId);
	}

}
