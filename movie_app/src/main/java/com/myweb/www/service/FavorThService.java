package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.FavorThVO;

public interface FavorThService {
	int addTh(FavorThVO fvo);
	int removeTh(FavorThVO fvo);
	List<FavorThVO> getDetail(long mno);
}
