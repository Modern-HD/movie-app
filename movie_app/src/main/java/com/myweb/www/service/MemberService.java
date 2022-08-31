package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.BSeatVO;
import com.myweb.www.domain.BookVO;
import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MemberVO;
import com.myweb.www.domain.MovieVO;
import com.myweb.www.domain.ScheduleVO;

public interface MemberService {
	int register(MemberVO mvo);
	MemberVO login(MemberVO mvo);
	MemberVO getDetail(long mno);
	int modify(MemberVO mvo);
	int remove(long mno);
	int dupleCheck(String id);
	int checkmember(MemberVO mvo);
	
	int addTh(FavorThVO fvo);
	int removeTh(FavorThVO fvo);
	List<FavorThVO> getListTh(long mno);
	
	String getTname(long tno);
	
	public BookVO selectOne(long mno);
	public List<BSeatVO> selectSeatList(String bno);
	public MovieVO selectMoive(long movieId);
	public ScheduleVO selectScheule(long scno);
	public int countBook(long mno);
	
	
}
