package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.myweb.www.domain.ChatVO;

@Repository
public interface ChatDAO {
	int insert(ChatVO chvo);
	List<ChatVO> selectList(String movieId);
	List<ChatVO> selectMyList(@Param("movieId") String movieId, @Param("mno") long mno);
	int update(ChatVO chvo);
	int delete(long cno);
}
