package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.TheaterVO;

public interface TheaterDAO {
	public List<TheaterVO> selectList(Long movieId);
	public List<TheaterVO> selectSpecialList(Long movieId);
	public List<TheaterVO> selectListAll();
	public TheaterVO selectOneFromTno(long tno);
	public List<TheaterVO> selectListByRegion(int region);
	public TheaterVO selectOne(long tno);
	public String selectTname(long tno);
}
