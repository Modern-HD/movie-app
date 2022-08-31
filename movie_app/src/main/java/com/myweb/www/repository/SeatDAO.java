package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.SearchDTO;
import com.myweb.www.domain.SeatVO;

public interface SeatDAO {

	public int insertSeat(SearchDTO schdto);
	public int selectSeatCount(long scno);
	public int selectEmptyCount(long scno);
	public List<SeatVO> selectListFromScno(long scno);
	public int updateStatusToTrue(SeatVO svo);
	public int updateStatusToFalse(SeatVO svo);
	public int deleteAllFromScno(long scno);
}
