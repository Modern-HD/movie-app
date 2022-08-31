package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MemberVO;
import com.myweb.www.domain.TheaterDTO;
import com.myweb.www.domain.TheaterVO;

public interface TheaterService {
	List<TheaterVO> getList(int region);
	TheaterDTO getDetailDTO(long tno);
	String getTname(long tno);
	
	int addTh(FavorThVO fvo);
	int removeTh(FavorThVO fvo);
	List<FavorThVO> getListTh(long mno);
	
	MemberVO getDetail(long mno);
}
