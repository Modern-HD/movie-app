package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.BSeatVO;

public interface BSeatDAO {
	public int insertBSeat(BSeatVO bsvo);
	public int deleteBSestsFromBno(String bno);
	public List<BSeatVO> selectSeatFromBno(String bno);
}
