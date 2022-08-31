package com.myweb.www.ctrl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.myweb.www.domain.MovieVO;
import com.myweb.www.service.MovieService;

import lombok.extern.slf4j.Slf4j;

/**
 * Handles requests for the application home page.
 */
@Slf4j
@RequestMapping("/movie/*")
@Controller
public class MovieController {
	
	@Inject
	private MovieService mosv;
	
	@GetMapping("/info")
	public void info(Model model) {
		List<MovieVO> list = mosv.MovieList();
		model.addAttribute("list", list);
	}
	
	@GetMapping("/detail")
	public void detail(@RequestParam("movieId") long movieId,@RequestParam("rank") int rank,  Model model) {
		MovieVO movo = mosv.MovieDetail(movieId);
		model.addAttribute("movo", movo);
		model.addAttribute("rank", rank);
	}
	
	@GetMapping(value = "/getmovielist", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<MovieVO>> getMovieList() {
		return new ResponseEntity<List<MovieVO>>(mosv.MovieList(), HttpStatus.OK);
	}
	
	@GetMapping(value = "/getlink/{movieId}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<String> spread(@PathVariable("movieId") String movieId){
		return new ResponseEntity<String>(mosv.getLink(Long.parseLong(movieId)), HttpStatus.OK);
	}
}
