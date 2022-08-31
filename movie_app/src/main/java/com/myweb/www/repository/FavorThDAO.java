package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.FavorThVO;

public interface FavorThDAO {
	List<FavorThVO> selectOne(long mno);
	int insert(FavorThVO fvo);
	int delete(long fno);
	long selectFno(FavorThVO fvo);
	int countFno(long mno);
	int dupleCheck(FavorThVO fvo);
}
