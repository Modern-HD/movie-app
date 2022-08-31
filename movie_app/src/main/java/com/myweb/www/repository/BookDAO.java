package com.myweb.www.repository;

import com.myweb.www.domain.BookVO;

public interface BookDAO {
	public int insertBook(BookVO bvo);
	public int selectBnoCount();
	public BookVO selectBook(long mno);
	public int deleteBook(String bno);
	public int countBookFromMno(long mno);
}
