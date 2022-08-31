package com.myweb.www.ctrl;


import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myweb.www.domain.ChatVO;
import com.myweb.www.service.ChatService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/chat/*")
public class ChatCtrl {
	@Inject
	private ChatService chsv;
	
	
	@PostMapping(value="/post", consumes = "application/json", produces = {MediaType.TEXT_PLAIN_VALUE})
	public ResponseEntity<String> post(@RequestBody ChatVO chvo) {
		return chsv.register(chvo) > 0 ? 
				new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/list/{movieId}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<ChatVO>> spread(@PathVariable("movieId") String movieId){
		return new ResponseEntity<List<ChatVO>>(chsv.getList(movieId), HttpStatus.OK);
	}
	@DeleteMapping(value = "/{chno}", produces = {MediaType.TEXT_PLAIN_VALUE})
	public ResponseEntity<String> remove(@PathVariable("chno") long chno) {
		return chsv.remove(chno) > 0 ? new ResponseEntity<String>("1", HttpStatus.OK) : new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
