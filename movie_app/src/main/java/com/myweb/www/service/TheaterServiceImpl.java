package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.FavorThVO;
import com.myweb.www.domain.MemberVO;
import com.myweb.www.domain.RoomVO;
import com.myweb.www.domain.TheaterDTO;
import com.myweb.www.domain.TheaterVO;
import com.myweb.www.repository.FavorThDAO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.repository.RoomDAO;
import com.myweb.www.repository.TheaterDAO;

@Service
public class TheaterServiceImpl implements TheaterService {
	@Inject
	private TheaterDAO tdao;
	@Inject
	private RoomDAO rdao;
	@Inject
	private FavorThDAO fdao;
	@Inject
	private MemberDAO mdao;
	

	@Override
	public List<TheaterVO> getList(int region) {
		return tdao.selectListByRegion(region);
	}

	@Override
	public TheaterDTO getDetailDTO(long tno) {
		List<RoomVO> rooms = rdao.selectList(tno);
		TheaterVO tvo = tdao.selectOne(tno);
		return new TheaterDTO(rooms, tvo);
	}

	@Override
	public String getTname(long tno) {
		return tdao.selectTname(tno);
	}

	@Override
	public List<FavorThVO> getListTh(long mno) {
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

	@Override
	public MemberVO getDetail(long mno) {
		return mdao.selectDetail(mno);
	}
	
}
