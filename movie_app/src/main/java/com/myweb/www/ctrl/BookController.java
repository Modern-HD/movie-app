package com.myweb.www.ctrl;


import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.myweb.www.domain.DateDTO;
import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MovieVO;
import com.myweb.www.domain.PayDTO;
import com.myweb.www.domain.SeatingDTO;
import com.myweb.www.domain.TheaterVO;
import com.myweb.www.handler.TokenHandler;
import com.myweb.www.service.BookService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/book/*")
public class BookController {

	@Inject
	private BookService bsv;
	
	@GetMapping("/")
	public String bookingHome(@RequestParam(name = "movieId", required = false) Long movieId, Model model) {
		log.info(">>> BookCtrl > home > GET");
		if(movieId != null) {
			model.addAttribute("movieId", movieId);
		}
		return "/book/index";
	}
	
	@GetMapping("/seating/{scno}")
	public String seatingPage(@PathVariable("scno") long scno, Model model) {
		log.info(">>> BookCtrl > seating > GET");
		model.addAttribute("scno", scno);
		return "/book/seat";
	}
	
	@PostMapping("/pay")
	public String payPage(PayDTO pydto, Model model) {
		log.info(">>> BookCtrl > pay > POST");
		model.addAttribute("pydto", pydto);
		return "/book/pay";
	}
	
	@PostMapping("/pay_auth")
	public String payAuth(PayDTO pydto, Model model) {
		TokenHandler thd = new TokenHandler();
		List<String> sidList = thd.tokenParser(pydto.getSeats());
		String bno = bsv.register(pydto, sidList);
		if (bno != null && bno != "") {
			model.addAttribute("bno", bno);
			model.addAttribute("pydto", pydto);
			return "/book/pay_ok";
		} else {
			return "redirect:/";
		}
	}
	
	@GetMapping(value = "/movie", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<MovieVO>> spreadMovie() {
		List<MovieVO> list = bsv.getMovieList();
		return list != null ? new ResponseEntity<List<MovieVO>>(list, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = {"/date/{tno}", "/date/{tno}/{movieId}"}, produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<DateDTO>> spreadDate(@PathVariable("tno") long tno, @PathVariable(name = "movieId", required = false) Long movieId) {
		log.info(">>> BookCtrl > spreadDate > GET");
		List<DateDTO> list = bsv.getDateList(tno, movieId);
		return list != null ? new ResponseEntity<List<DateDTO>>(list, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/seat/{scno}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<SeatingDTO> spreadSeat(@PathVariable("scno") long scno) {
		log.info(">>> BookCtrl > spreatSeat > GET");
		SeatingDTO sdto = bsv.getSeatList(scno);
		return sdto != null ? new ResponseEntity<SeatingDTO>(sdto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/theaters", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<TheaterVO>> spreadTheaters() {
		log.info(">>> BookCtrl > spreadTheaters > GET");
		List<TheaterVO> tvoList = bsv.getTheaterListAll();
		return tvoList != null ? new ResponseEntity<List<TheaterVO>>(tvoList, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = {"/theater", "/theater/{movieId}"}, produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<TheaterVO>> spreadTheater(@PathVariable(name = "movieId", required = false) Long movieId) {
		log.info(">>> BookCtrl > spreadTheater > GET");
		List<TheaterVO> tvoList = bsv.getTheaterList(movieId);
		return tvoList != null ? new ResponseEntity<List<TheaterVO>>(tvoList, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = {"/special", "/special/{movieId}"}, produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<TheaterVO>> spreadSpecial(@PathVariable(name = "movieId", required = false) Long movieId) {
		log.info(">>> BookCtrl > spreadSpecial > GET");
		List<TheaterVO> tvoList = bsv.getSpecialList(movieId);
		return tvoList != null ? new ResponseEntity<List<TheaterVO>>(tvoList, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/mytheater/{mno}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<FavorThVO>> spreadMyTheater(@PathVariable("mno") long mno) {
		log.info(">>> TheaterCtrl > spreadMyTheater > GET");
		List<FavorThVO> fvoList = bsv.getMyTheaterList(mno);
		return fvoList != null ? new ResponseEntity<List<FavorThVO>>(fvoList, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/pay/info/{scno}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<PayDTO> spreadPayInfo(@PathVariable long scno) {
		log.info(">>> BookCtrl > spreadPayInfo > GET");
		PayDTO pydto = bsv.getPydto(scno);
		return pydto != null ? new ResponseEntity<PayDTO>(pydto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
