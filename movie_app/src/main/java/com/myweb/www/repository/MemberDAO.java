package com.myweb.www.repository;

import com.myweb.www.domain.MemberVO;

public interface MemberDAO {
	int insert(MemberVO mvo);
	MemberVO selectLogin(MemberVO mvo);
	MemberVO selectDetail(long mno);
	int selectId(String id);
	int update(MemberVO mvo);
	int delete(long mno);
	int checkMember(MemberVO mvo);
}
