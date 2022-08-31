<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="header.jsp"/>
<jsp:include page="../common/nav.jsp"/>

<div id="pay_info" class="col-11 col-md-8 col-lg-7 col-xl-8 col-xxl-6 mx-auto my-5">
    <div class="d-flex justify-content-center align-items-center bg-black text-white">
        <h4 class="my-2">예매 완료</h4>
    </div>
    <div class="col-11 col-xxl-10 mx-auto row">
        <h2 class="text-center my-3">예매가 완료 되었습니다</h2>
        <div id="movie_img" class="col-12 col-xl-5 my-3">
            <img src="https://file.cineq.co.kr/i.aspx?movieid=<c:out value="${pydto.movieId }"/>&size=210" class="d-block mx-auto">
        </div>
        <div id="book_info" class="col-12 col-xl-7 my-3 d-flex">
            <table class="fs-5 mx-auto">
                <tr>
                    <td>예매번호</td>
                    <td class="fw-bold px-3"><c:out value="${bno }"/></td>
                </tr>
                <tr>
                    <td>영화</td>
                    <td id="movie_name_zone" class="fw-bold px-3"></td>
                </tr>
                <tr>
                    <td>극장</td>
                    <td id="theater_name_zone"  class="fw-bold px-3"></td>
                </tr>
                <tr>
                    <td>일시</td>
                    <td id="date_name_zone" class="fw-bold px-3"></td>
                </tr>
                <tr>
                    <td>인원</td>
                    <td class="fw-bold px-3">
                        <c:if test="${pydto.adult > 0 }">
                            일반 <c:out value="${pydto.adult }"/>명
                        </c:if>
                        <c:if test="${pydto.teenager > 0 }">
                            청소년 <c:out value="${pydto.teenager }"/>명
                        </c:if>
                        <c:if test="${pydto.elder > 0 }">
                            경로 <c:out value="${pydto.elder }"/>명
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <td>좌석</td>
                    <td id="seat_name_zone" class="fw-bold px-3"></td>
                </tr>
                <tr>
                    <td>결제금액</td>
                    <td class="fw-bold px-3 text-danger"><c:out value="${pydto.pay }"/>원</td>
                </tr>
            </table>
        </div>
        <div class="text-center my-4">
            <a href="/member/mypage?mno=<c:out value="${pydto.mno }"/>" class="btn btn-dark">예매확인 / 취소</a>
        </div>
        <div id="pay_info_footer" class="col-11 mx-auto row">
            <div class="col-12 col-xxl-4 mb-0 mt-3">
                <h4 class="text-secondary text-center">예매 주의사항</h4>
            </div>
            <div class="col-12 col-xxl-8 my-3">
                <p class="mt-0 mb-1">
                    청소년과 경로 고객분들은 학생증 혹은 신분증을 지참하셔야 합니다.
                </p>
                <p class="my-1">
                    입장시에는 티켓 판매기 혹은 매표소에서 티켓을 발권 받으셔야 합니다.
                </p>
                <p class="my-1">
                    영화 상영 스케쥴은 영화관 사정에 의해 변경될 수 있습니다.
                </p>
            </div>
        </div>
    </div>
</div>
<div id="loading_modal" class="bg-light bg-opacity-50 d-flex justify-content-center align-items-center">
    <div class="fs-1 spinner-border text-secondary"></div>
</div>
<script>
    const get_scno = `<c:out value="${pydto.scno}"/>`;
    const get_seats = `<c:out value="${pydto.seats}"/>`;
</script>
<script src="/resources/js/book.pay_ok.js"></script>
<jsp:include page="../common/footer.jsp"/>