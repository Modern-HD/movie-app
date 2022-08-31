<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="header_contents">
    <div id="nav_header" class="col-10 mx-auto clearfix py-4">
        <div class="col-4 float-start">
            <a href="/"><img src="/resources/images/logoOGV.png" style="height: 50px"></a> <span
                style="vertical-align: bottom" class="d-lg-inline d-none">C U L T U R E F L E X</span>
        </div>
        <div class="col-8 float-end member_icon_zone text-end">
            <ul class="list-unstyled mb-0">
                <c:if test="${ses eq null }">
                <li class="member_icons"><a href="/member/login"><img class="member_icons_img"
                            src="/resources/images/loginPassword.png"><br>로그인</a></li>
                <li class="member_icons"><a href="/member/register"><img class="member_icons_img"
                            src="/resources/images/loginJoin.png"><br>회원가입</a></li>
                </c:if>
                <c:if test="${ses ne null }">
                <li class="member_icons"><a href="/member/logout"><img class="member_icons_img"
                    src="/resources/images/loginPassword.png"><br>로그아웃</a></li>
                <li class="member_icons"><a href="/member/mypage?mno=${ses.mno }"><img class="member_icons_img"
                            src="/resources/images/loginMember.png"><br>마이OGV</a></li>
                </c:if>
            </ul>
        </div>
    </div>

    <nav class="navbar navbar-expand-sm navbar-light sticky-top">
        <div class="col-11 col-md-10 mx-auto" style="margin: 0px 256px">
            <div class="nav-item-zone fs-5">
                <a class="nav-item" href="/movie/info">영화</a>
                
                <c:choose>
				<c:when test="${ses.id eq null || ses.id eq '' }">
					<a class="nav-item" href="/theater/detail?tno=1&mno=0">상영관</a>
				</c:when>
				<c:otherwise>
					<a class="nav-item" href="/theater/detail?tno=1&mno=${ses.mno }">상영관</a>
				</c:otherwise>
			</c:choose>
                
                <a class="nav-item" href="/book/">예매</a>
            </div>
            <ul class="nav flex-column dropdown-menu">
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        </div>
    </nav>
</div>