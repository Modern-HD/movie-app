package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.FavorThVO;
import com.myweb.www.repository.FavorThDAO;

@Service
public class FavorThServiceImpl implements FavorThService {
	
	@Inject
	private FavorThDAO fdao;

	@Override
	public List<FavorThVO> getDetail(long mno) {
		return fdao.selectOne(mno);
	}

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

}
