<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="header.jsp"/>
<jsp:include page="../common/nav.jsp"/>

    <div class="container">
        <div class="col-11 col-md-10 col-lg-8 col-xl-5 mx-auto my-5">
            <div id="login_header" class="d-flex">
                <div class="login-choice-btn bg-pink">
                    로그인
                </div>
            </div>
            <div id="login_body" class="col-12 p-4 mb-4">
                <div id="login_form" class="col-11 col-md-10 mx-auto text-center">
                    <form action="/member/login" method="post">
                        <span class="text-secondary">아이디 비밀번호를 입력하신 후, 로그인 버튼을 클릭해 주세요.</span>
                        <div class="position-relative mb-2 mt-3 mx-auto login-input-zone">
                            <input type="text" name="id" class="login-input" required>
                            <div class="input-icon text-secondary">
                                <i class="bi bi-person-fill fs-5"></i>
                            </div>
                        </div>
                        <div class="position-relative mb-2 mx-auto login-input-zone">
                            <input type="password" name="pwd" class="login-input" required>
                            <div class="input-icon text-secondary">
                                <i class="bi bi-lock-fill"></i>
                            </div>
                        </div>
                        <button id="login_btn" type="submit" class="bg-pink">로그인</button>
                    </form>
                </div>
            </div>
            <div id="login_footer" class="col-12">
                <div class="col-12 text-center text-secondary p-3">
                    회원가입하시고 다양한 혜택을 누리세요!
                    <a id="to_register_btn" href="/member/register" class="py-2 px-4 d-block mx-xl-3 d-xl-inline">OGV 회원가입</a>
                </div>
            </div>
        </div>
    </div>

<jsp:include page="../common/footer.jsp"/>