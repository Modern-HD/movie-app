package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.ChatVO;
import com.myweb.www.repository.ChatDAO;

@Service
public class ChatServiceImpl implements ChatService {
	@Inject
	private ChatDAO chdao; 
	
	@Override
	public int register(ChatVO chvo) {
		return chdao.insert(chvo);
	}

	@Override
	public List<ChatVO> getList(String movieId) {
		return chdao.selectList(movieId);
	}

	@Override
	public List<ChatVO> getMyList(String movieId, long mno) {
		return chdao.selectMyList(movieId, mno);
	}

	@Override
	public int modify(ChatVO chvo) {
		return chdao.update(chvo);
	}

	@Override
	public int remove(long chvo) {
		return chdao.delete(chvo);
	}

}
