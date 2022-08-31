package com.myweb.www.repository;

import java.util.List;
import java.util.Map;

import com.myweb.www.domain.RoomVO;

public interface RoomDAO {
	public List<RoomVO> selectList(long tno);
	public List<RoomVO> selectListAll();
	public List<RoomVO> selectTicketList(long tno);
	public RoomVO selectOneFromRno(long rno);
}
