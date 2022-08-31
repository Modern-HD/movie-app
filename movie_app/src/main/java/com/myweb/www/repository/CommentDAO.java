package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.CommentVO;
import com.myweb.www.domain.PagingVO;

public interface CommentDAO {
	int insert(CommentVO cvo);
	List<CommentVO> selectList(@Param("movieId") long movieId, @Param("pgvo") PagingVO pgvo);
	int update(CommentVO cvo);
	int delete(long cno);
	int selectTotalCount(long movieId);
	int selectSumRate(long movieId);
}
