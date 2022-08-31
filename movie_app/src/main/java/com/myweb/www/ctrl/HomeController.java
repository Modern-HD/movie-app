package com.myweb.www.ctrl;

import java.util.List;
import java.util.Locale;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.myweb.www.domain.MovieVO;
import com.myweb.www.service.MovieService;

import lombok.extern.slf4j.Slf4j;

/**
 * Handles requests for the application home page.
 */
@Slf4j
@Controller
public class HomeController {
	
	@Inject
	private MovieService mosv;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		
		log.info("Welcome home! The client locale is {}.", locale);
		List<MovieVO> list = mosv.MovieList();
		model.addAttribute("list", list);
		return "home";
	}
	
}
