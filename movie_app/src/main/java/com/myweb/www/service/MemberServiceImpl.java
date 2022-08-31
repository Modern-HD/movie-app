package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.BSeatVO;
import com.myweb.www.domain.BookVO;
import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MemberVO;
import com.myweb.www.domain.MovieVO;
import com.myweb.www.domain.ScheduleVO;
import com.myweb.www.repository.BSeatDAO;
import com.myweb.www.repository.BookDAO;
import com.myweb.www.repository.FavorThDAO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.repository.MovieDAO;
import com.myweb.www.repository.ScheduleDAO;
import com.myweb.www.repository.TheaterDAO;

@Service
public class MemberServiceImpl implements MemberService {

	@Inject
	public MemberDAO mdao;
	@Inject
	public FavorThDAO fdao;
	@Inject
	public TheaterDAO tdao;
	@Inject
	public BookDAO bdao;
	@Inject
	private MovieDAO modao;
	@Inject 
	private ScheduleDAO scdao;
	@Inject
	private BSeatDAO bsdao;
	
	@Override
	public int register(MemberVO mvo) {
		return mdao.insert(mvo);
	}

	@Override
	public MemberVO login(MemberVO mvo) {
		return mdao.selectLogin(mvo);
	}

	@Override
	public MemberVO getDetail(long mno) {
		return mdao.selectDetail(mno);
	}

	@Override
	public int modify(MemberVO mvo) {
		return mdao.update(mvo);
	}

	@Override
	public int remove(long mno) {
		return mdao.delete(mno);
	}

	@Override
	public int dupleCheck(String id) {
		return mdao.selectId(id);
	}

	@Override
	public int checkmember(MemberVO mvo) {
		return mdao.checkMember(mvo);
	}
    // -----------------------------
	@Override
	public int addTh(FavorThVO fvo) {
		if (fdao.dupleCheck(fvo) > 0) {
			return 0;
		} else {
			if (fdao.countFno(fvo.getMno()) < 3) {
				return fdao.insert(fvo);
			} else {
				return 0;
			}
		}
	}

	@Override
	public int removeTh(FavorThVO fvo) {
		return fdao.delete(fdao.selectFno(fvo));
	}

	@Override
	public List<FavorThVO> getListTh(long mno) {
		return fdao.selectOne(mno);
	}
	// ------------------------
	@Override
	public String getTname(long tno) {
		return tdao.selectTname(tno);
	}
	// ------------------------------------

	@Override
	public BookVO selectOne(long mno) {
		return bdao.selectBook(mno);
	}

	@Override
	public List<BSeatVO> selectSeatList(String bno) {
		return bsdao.selectSeatFromBno(bno);
	}

	@Override
	public MovieVO selectMoive(long movieId) {
		return modao.selectMovieDetail(movieId);
	}

	@Override
	public ScheduleVO selectScheule(long scno) {
		return scdao.selectOneFromScno(scno);
	}

	@Override
	public int countBook(long mno) {
		return bdao.countBookFromMno(mno);
	}
}
