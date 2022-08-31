package com.myweb.www.repository;

import java.util.List;
import java.util.Map;

import com.myweb.www.domain.RoomVO;
import com.myweb.www.domain.ScheduleVO;
import com.myweb.www.domain.SearchDTO;

public interface ScheduleDAO {
	public List<ScheduleVO> selectList(Map<String, Long> map); 
	public List<ScheduleVO> selectList(SearchDTO schdto); 
	public List<ScheduleVO> selectListAll(); 
	public ScheduleVO selectOneFromScno(long scno);
	public List<ScheduleVO> selectOldSchedule();
	public int insert(ScheduleVO scvo);
	public int deleteFromScno(long scno);
}
