package com.myweb.www.ctrl;

import java.util.ArrayList;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.myweb.www.domain.BookDTO;
import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MemberVO;
import com.myweb.www.handler.FileHandler;
import com.myweb.www.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@RequestMapping("/member/*")
@Controller
@Slf4j
public class MemberController {

	@Inject
	public MemberService msv;
	@Inject
	public FileHandler fhd;
	
	@GetMapping("/register")
	public void register() {}
	
	@PostMapping("/register")
	public String register(MemberVO mvo, RedirectAttributes rttr) {
		msv.register(mvo);
		return "redirect:/member/login";
	}
	
	@GetMapping("/login")
	public void login() {}
	
	@PostMapping("/login")
	public String login(MemberVO mvo, RedirectAttributes rttr, HttpSession ses) {
		MemberVO sesMvo = msv.login(mvo);
		if(sesMvo != null) {
			log.info(">>> member login - OK");
			ses.setAttribute("ses", sesMvo);
			ses.setMaxInactiveInterval(10*60);
			rttr.addFlashAttribute("isLogin", 1);
			return "redirect:/";
		}else {
			return "redirect:/member/login";
		}
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession ses, RedirectAttributes rttr) {
		ses.removeAttribute("ses");
		ses.invalidate();
		return "redirect:/";
	}
	
	@ResponseBody
	@PostMapping(value = "/dupleCheck", consumes = "application/json",
				produces = {MediaType.TEXT_PLAIN_VALUE})
	public String dupleCheck(@RequestBody HashMap<String, String> map) {
		log.info(">>> {}", map.get("id"));
		int isExist = msv.dupleCheck(map.get("id"));		
		return isExist > 0 ? "1" : "0";
	}
	
	@GetMapping("/mypage")
	public void mypage(Model model, @RequestParam("mno") long mno) {
		model.addAttribute("mvo", msv.getDetail(mno));
		model.addAttribute("mylist", msv.getListTh(mno));
		model.addAttribute("bvo", msv.selectOne(mno));
		List<BookDTO> bookList = new ArrayList<BookDTO>();
		for (int i = 0; i < msv.countBook(mno); i++) {
			BookDTO bdto = new BookDTO();
			bdto.setBvo(msv.selectOne(mno));
			bdto.setBsvoList(msv.selectSeatList(bdto.getBvo().getBno()));
			bdto.setMvo(msv.selectMoive(bdto.getBvo().getMovieId()));
			bdto.setScvo(msv.selectScheule(bdto.getBvo().getScno()));
			bdto.setTname(msv.getTname(bdto.getScvo().getTno()));
			bookList.add(bdto);
		}
		model.addAttribute("bookList", bookList);
	}
	
	@PostMapping(value = "/addFavorTh", consumes = "application/json",
			produces = {MediaType.TEXT_PLAIN_VALUE})
	public ResponseEntity<String> addTh (@RequestBody FavorThVO fvo, RedirectAttributes rttr){
		if (msv.addTh(fvo) == 0) {
			return new ResponseEntity<String>("1", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("0", HttpStatus.OK);
		}
	}
	@PostMapping(value = "/removeFavorTh", consumes = "application/json",
			produces = {MediaType.TEXT_PLAIN_VALUE})
	public ResponseEntity<String> removeTh (@RequestBody FavorThVO fvo){
		return msv.removeTh(fvo) > 0 ?
				new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@GetMapping(value = "/spread/{mnoVal}", consumes = "application/json", 
			produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<FavorThVO>> spread(Model model, @PathVariable("mnoVal") long mno){
		List<FavorThVO> list = new ArrayList<FavorThVO>();
		list = msv.getListTh(mno);
		log.info(">>> List : {}", list);
		return list != null ? 
				new ResponseEntity<List<FavorThVO>>(HttpStatus.OK)
				: new ResponseEntity<List<FavorThVO>>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@GetMapping("/favorThSet")
	public void setFavorTh (Model model, @RequestParam("mno") long mno) {
		model.addAttribute("mvo", msv.getDetail(mno));
		model.addAttribute("mylist", msv.getListTh(mno));
	}
	
	@GetMapping("/modify")
	public void modify(Model model, @RequestParam("mno") long mno) {
		model.addAttribute("mvo", msv.getDetail(mno));
	}
	@PostMapping("/modify")
	public String modify(MemberVO mvo, 
			@RequestParam(name = "profile", required = false) MultipartFile file) {
		mvo= fhd.setMemberImg(file, mvo);
		if (mvo.getNickName() == null || mvo.getNickName() == "") {
			mvo.setNickName(mvo.getOldNick());
		}
		msv.modify(mvo);
		return "redirect:/member/mypage?mno=" + mvo.getMno();
	}
	@GetMapping("/remove")
	public void remove(Model model, @RequestParam("mno") long mno) {
		model.addAttribute("mvo", msv.getDetail(mno));
		model.addAttribute("mylist", msv.getListTh(mno));
	}
	@PostMapping("/remove")
	public String remove(MemberVO mvo, HttpSession ses) {
		if(msv.checkmember(mvo) > 0) {
			log.info(">>> member remove - OK");
			msv.remove(mvo.getMno());
			ses.removeAttribute("ses");
			ses.invalidate();
			return "redirect:/";
		}else {
			return "redirect:/member/remove?mno="+mvo.getMno();
		}
	}
}
