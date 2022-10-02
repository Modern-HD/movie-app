package com.myweb.www.ctrl;


import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MemberVO;
import com.myweb.www.domain.TheaterDTO;
import com.myweb.www.domain.TheaterVO;
import com.myweb.www.service.TheaterService;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/theater/*")
@Slf4j
public class TheaterController {
	
	@Inject
	private TheaterService tsv;
	
	@GetMapping("/list")
	private void list(Model model, @RequestParam("region") int region) {
		log.info(">>> TheaterCtrl > list > GET");
		model.addAttribute("list", tsv.getList(region));
	}
	
	@GetMapping("/detail")
	private void detail(Model model, HttpSession ses, @RequestParam("tno") long tno) {
		log.info(">>> TheaterCtrl > detail > GET");
		TheaterDTO tdto = tsv.getDetailDTO(tno);
		MemberVO mvo = (MemberVO)ses.getAttribute("ses");
		model.addAttribute("list", tsv.getList(0));
		model.addAttribute("tvo", tdto.getTvo());
		model.addAttribute("rooms", tdto.getRooms());
		if (mvo != null) {
			model.addAttribute("mno", mvo.getMno());
			model.addAttribute("mvo", tsv.getDetail(mvo.getMno()));
			model.addAttribute("mylist", tsv.getListTh(mvo.getMno()));
		}
	}
	
	@GetMapping(value = "/region/{regionNum}",
			produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<TheaterVO>> getList(@PathVariable("regionNum") int regionNum){
		List<TheaterVO> tvoList = tsv.getList(regionNum);
		return tvoList != null ?
				new ResponseEntity<List<TheaterVO>>(tvoList, HttpStatus.OK)
				: new ResponseEntity<List<TheaterVO>>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
