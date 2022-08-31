package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.CommentVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.handler.PagingHandler;
import com.myweb.www.repository.CommentDAO;

@Service
public class CommentServiceImpl implements CommentService {

	@Inject
	private CommentDAO cdao;
	
	@Override
	public int post(CommentVO cvo) {
		return cdao.insert(cvo);
	}

	@Override
	public PagingHandler spread(long movieId, PagingVO pgvo) {
		return new PagingHandler(cdao.selectList(movieId, pgvo), pgvo, cdao.selectTotalCount(movieId), cdao.selectSumRate(movieId));
	}

	@Override
	public int modify(CommentVO cvo) {
		return cdao.update(cvo);
	}

	@Override
	public int remove(long cno) {
		return cdao.delete(cno);
	}

}
