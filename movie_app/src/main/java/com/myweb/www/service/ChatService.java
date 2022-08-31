package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.ChatVO;

public interface ChatService {
	int register(ChatVO chvo);
	List<ChatVO> getList(String movieId);
	List<ChatVO> getMyList(String movieId, long mno);
	int modify(ChatVO chvo);
	int remove(long chvo);
}
