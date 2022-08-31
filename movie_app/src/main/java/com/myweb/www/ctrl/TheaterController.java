package com.myweb.www.ctrl;


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

import com.myweb.www.domain.TheaterDTO;
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
		model.addAttribute("list", tsv.getList(region));
	}
	
	@GetMapping("/detail")
	private void detail(Model model, @RequestParam("tno") long tno, @RequestParam("mno") long mno) {
		TheaterDTO tdto = tsv.getDetailDTO(tno);
		model.addAttribute("list", tsv.getList(0));
		model.addAttribute("tvo", tdto.getTvo());
		model.addAttribute("rooms", tdto.getRooms());
		if (mno > 0) {
			model.addAttribute("mvo", tsv.getDetail(mno));
			model.addAttribute("mylist", tsv.getListTh(mno));
		}
	}
	@GetMapping(value = "/region/{regionNum}",
			produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Model> getList(Model model, @PathVariable("regionNum") int regionNum){
		log.info(">>>>>>>>>> getListCheck <<<<<<<<<<<<<");
		model.addAttribute("list"+regionNum, tsv.getList(regionNum));
		return tsv.getList(regionNum) != null ?
				new ResponseEntity<Model>(model, HttpStatus.OK)
				: new ResponseEntity<Model>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
