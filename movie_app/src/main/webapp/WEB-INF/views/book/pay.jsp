<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="header.jsp"/>
<jsp:include page="../common/nav.jsp"/>

    <div class="container mx-auto d-flex flex-wrap justify-content-center p-0 my-5">
        <div class="m-0 p-0 d-flex flex-wrap justify-content-center container h-auto">
            <div id="select_payment" class="col-12">

                <div class="tit pt-2 pb-2 d-flex justify-content-center align-items-center">
                    <h4 class="m-0 text-white fw-normal">결제수단 선택</h4>
                </div>

                <!-- 결제수단 선택-->
                <div id="payment_zone" class="justify-content-center">
                    <div class=" m-0 p-0  justify-content-center">
                        <div id="" class="col-12 base p-0">
                            <div class="payment_select radio_group pt-2" id="lastPayCon">
                                <div class="payment_line">
                                    <span style="opacity: 1; margin-left: 20px;">
                                        <input type="radio" id="last_pay_radio0" name="last_pay_radio" value="0"
                                            checked="checked">
                                        <label for="last_pay_radio0">신용카드 </label>
                                    </span>
                                    <span style="opacity: 1;">
                                        <input type="radio" id="last_pay_radio1" name="last_pay_radio" value="1">
                                        <label for="last_pay_radio1">휴대폰 결제</label>
                                    </span>
                                    <span style="opacity: 1;">
                                        <input type="radio" id="last_pay_radio2" name="last_pay_radio" value="2">
                                        <label for="last_pay_radio2">간편결제</label>
                                    </span>
                                    <span style="opacity: 1;">
                                        <input type="radio" id="last_pay_radio3" name="last_pay_radio" value="3">
                                        <label for="last_pay_radio3">내통장결제</label>
                                    </span>
                                    <span style="opacity: 1;">
                                        <input type="radio" id="last_pay_radio4" name="last_pay_radio" value="4">
                                        <label for="last_pay_radio4">토스</label>
                                    </span>
                                </div>

                                <div class="payment_form">
                                    <!---->

                                    <div id="payCredit" class="payment_input payment_card" style="display: block;">

                                        <!-- 신용카드 선택시 -->
                                        <div id="card" class="card_zone">
                                            <table>
                                                <tbody>
                                                    <tr class="payment_card_radio_wrap radio_group"
                                                        style="display: table-row;">
                                                        <td colspan="2">
                                                            <span class="selectType" style="display: inline;">
                                                                <input type="radio" id="payment_card_radio0"
                                                                    name="payment_card_radio" value="0"
                                                                    checked="checked">
                                                                <label for="payment_card_radio0">앱카드</label>
                                                            </span>
                                                            <span class="selectType" style="display: inline;">
                                                                <input type="radio" id="payment_card_radio1"
                                                                    name="payment_card_radio" value="1"
                                                                    checked="checked">
                                                                <label for="payment_card_radio1">일반 신용카드(체크카드
                                                                    포함)</label>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!--간편결제 선택시 (네이버페이, 카카오페이)-->
                                        <div id="quick_payment" class="card_zone d-none">
                                            <table>
                                                <tbody>
                                                    <tr class="payment_card_radio_wrap radio_group"
                                                        style="display: table-row;">
                                                        <td colspan="2">
                                                            <span class="selectType" style="display: inline;">
                                                                <input type="radio" id="payment_card_radio2"
                                                                    name="payment_card_radio" value="0"
                                                                    checked="checked">
                                                                <label for="payment_card_radio2">네이버페이</label>
                                                            </span>
                                                            <span class="selectType" style="display: inline;">
                                                                <input type="radio" id="payment_card_radio3"
                                                                    name="payment_card_radio" value="1"
                                                                    checked="checked">
                                                                <label for="payment_card_radio3">카카오페이</label>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>



                                        <!-- 결제금액 (고정)-->
                                        <div class="price_default" style="width: auto; min-height: 210px;">
                                            <div class="payment_info">
                                                <div>
                                                    <span class="payment_price">결제금액</span>
                                                </div>
                                                <div class="p_line">
                                                    <span class="string2 amount"
                                                        style="font-size: 1.5em; font-weight:bold;"><c:out value="${pydto.pay }"/></span>
                                                    <span class="string2 won">원</span>
                                                </div>
                                                <div class="p_line2">
                                                    <span class="payment_price">상품명</span>
                                                </div>
                                                <div>
                                                    <span class="string2 amount">영화티켓예매</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 결제수단별 안내-->

                                        <!-- 신용카드 -->
                                        <div id="card_info" class="card_explain">
                                            <ul class="list-unstyled px-4">
                                                <li class="isp">선택하신 카드로 결제하려면 ISP 프로그램이 필요합니다. 처음 결제하시는 경우 ISP 프로그램 설치가
                                                    진행 됩니다.</li>
                                                <li class="ssa">즉시할인/더블적립 혜택이 적용되는 카드는 앱카드 결제 시에도 적용 가능합니다.</li>
                                                <li class="ssa">군인권종/동시상영/핫딜/온라인특별요금제/비회원 결제 시 CJONE삼성카드 즉시할인(더블적립) 및
                                                    삼성카드 온라인 선할인 적용은 불가합니다.</li>
                                                <li class="ssa">통합결제 시 CJONE삼성카드 즉시할인(더블적립) 및 삼성카드 온라인 선할인 적용은 불가합니다.
                                                </li>
                                                <li class="ssa">타 할인 적용 시 CJONE삼성카드 즉시할인(더블적립) 및 삼성카드 온라인 선할인 적용은 불가합니다.
                                                </li>
                                                <li class="ssa">카드 할인금액이 3천원 미만일 경우 할인 적용이 불가합니다.</li>
                                            </ul>
                                        </div>

                                        <div id="card_alert" class="payment_input_exp" id="savePointCon">
                                            <span>※
                                                신용카드 결제 가능 최소 금액은 1,000원 이상입니다.</span>
                                            <span>
                                                <span class="desc">
                                                    <a href="#" class="btn_savePoint">삼성U포인트 적립</a>&nbsp;&nbsp;<a
                                                        href="#" class="btn_savePoint">OK캐쉬백
                                                        적립</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                                </span><br>
                                                <span class="option">
                                                    (삼성U포인트, OK캐쉬백 포인트는 포인트 중복 적립 불가)
                                                </span>
                                            </span>
                                        </div>

                                        <!-- 휴대폰 -->
                                        <div id="phone" class="payment_transfer d-none">
                                            <div class="table_wrap transfer_wrap">
                                                <h6>휴대폰 결제 순서</h6>
                                                <div class="paymentNotice">
                                                    1. 우측 하단에 있는 "결제하기" 버튼 클릭해주세요.<br>
                                                    2. 예매내역 확인 후 결제하기 버튼 클릭 시 결제 팝업창이 뜹니다.<br>
                                                    3. 해당 팝업에서 통신사 선택 후 정보를 입력해주세요.
                                                    <br><br>
                                                    <b style="color:red">※ 휴대폰 결제 진행시 원할한 사용을 위하여 다음 사항을 꼭
                                                        확인하세요.</b><br>
                                                    * 팝업 차단 설정을 꼭 해제하셔야 합니다. (도구→팝업 차단 끄기)<br>
                                                    * 팝업 차단 해제 시, 웹 브라우저 새로고침으로 인하여 최대 10분 동안 동일 좌석 선택이 제한 될 수 있습니다.<br>
                                                </div>
                                            </div>
                                        </div>

                                        <!--간편결제-->
                                        <!-- 네이버 페이 -->
                                        <div id="naver_pay" class="payment_transfer d-none">
                                            <div class="table_wrap transfer_wrap">
                                                <h6>네이버페이 결제 순서</h6>
                                                <div class="paymentNotice">
                                                    <div style="width: 490px;">
                                                        1. 우측 하단에 있는 "결제하기"버튼을 클릭해주세요.<br>
                                                        2. 예매내역 확인 후 결제하기 버튼 클릭 시 '네이버페이' 결제 인증창이 뜹니다.<br>
                                                        3. '네이버페이'결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="naver_alert" class="payment_input_exp2 d-none" id="savePointCon">
                                            <span class="alert">'네이버페이'는 결제시, 기본 1% 네이버페이 포인트가 적립됩니다<br>
                                                '네이버페이'는 신용카드 선할인과 카드사 포인트는 이용이 불가능하며,
                                                <br>신용카드별 청구할인은 이용이 가능합니다.
                                            </span>
                                        </div>

                                        <!-- 카카오 페이 -->
                                        <div id="kakao_pay" class="payment_transfer d-none">
                                            <div class="table_wrap transfer_wrap">
                                                <h6>카카오페이 결제 순서</h6>
                                                <div class="paymentNotice">
                                                    <div style="width: 490px;">1. 우측 하단에 있는 '결제하기' 버튼을 클릭해주세요.<br>
                                                        2. 예매내역 확인 후 결제하기 버튼 클릭 시 '카카오페이' 결제 인증창이 뜹니다.
                                                        <br>3. '카카오페이' 결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="kakao_alert" class="payment_input_exp2 d-none" id="savePointCon">
                                            <span class="alert">* '카카오페이' 는 신용카드 선할인과 카드사 포인트는 이용이 불가능하며,<br>
                                                신용카드별 청구할인은 이용이 가능합니다.
                                            </span>
                                        </div>

                                        <!--내통장 결제-->
                                        <div id="mybank_book" class="payment_transfer d-none">
                                            <div class="table_wrap transfer_wrap">
                                                <h6>내통장 결제 순서</h6>
                                                <div class="paymentNotice">
                                                    <div style="width: 490px;">
                                                        1. 아래 결제하기 버튼 클릭 후 다음 단계로 이동<br>
                                                        2. 결제내역 확인 후 결제하기 버튼 클릭 시, 팝업창 노출<br>
                                                        3. 해당 팝업창을 통해 본인명의의 계좌 1회 등록<br>
                                                        4. 계좌등록 시, 비밀번호만으로 현금 간편결제 서비스 이용
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="mybank_alert" class="payment_input_exp2 d-none" id="savePointCon">
                                            <span class="alert">'내통장결제'는 CGV 내 본인명의 계좌 등록 후 비밀번호만으로 결제할 수 있는 간편 결제
                                                서비스입니다.<br>
                                                은행 점검시간인 경우 내통장결제 서비스 이용이 불가합니다.
                                            </span>
                                        </div>

                                        <!-- 토스 -->
                                        <div id="toss" class="payment_transfer d-none">
                                            <div class="table_wrap transfer_wrap">
                                                <h6>토스 결제 순서</h6>
                                                <div class="paymentNotice">
                                                    <div style="width: 490px;">
                                                        1. 우측 하단에 있는 "결제하기"버튼을 클릭해주세요.<br>
                                                        2. 예매내역 확인 후 결제하기 버튼 클릭 시 '토스' 결제 인증창이 뜹니다.<br>
                                                        3. '토스'결제 인증창에서 정보를 입력하신 후 결제해주세요.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="toss_alert" class="payment_input_exp2 d-none" id="savePointCon">
                                            <span class="alert">'토스'는 신용카드 선할인과 카드사 포인트는 이용이 불가능하며,<br>
                                                신용카드별 청구할인은 이용이 가능합니다.
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 결제 -->
                    <div id="pay_section" class="col-12 position-absolute start-0">
                        <div class="tnb">
                            <a class="btn_left" href="#"></a> <!-- 좌석선택버튼 -->

                            <!--영화정보-->
                            <div class="info movie">
                                <span class="movie_poster d-inline">
                                    <img src="" alt="영화 포스터">
                                </span>
                                <div class="row movie_title d-block">
                                    <span class="data letter-spacing-min">
                                        <a href="#" class="ellipsis-line2"></a>
                                    </span>
                                </div>
                                <div class="row movie_type d-block">
                                    <span class="data ellipsis-line1"></span>
                                </div>
                                <div class="row movie_rating d-block">
                                    <span class="data"></span>
                                </div>
                            </div>

                            <!--영화관 정보-->
                            <div class="info theater">
                                <div class="row name" style="display: block;">
                                    <span class="header">극장</span>
                                    <span class="data letter-spacing-min ellipsis-line1">
                                        <a href=""></a>
                                    </span>
                                </div>
                                <div class="row date" style="display: block;">
                                    <span class="header">일시</span>
                                    <span class="data"></span>
                                </div>
                                <div class="row screen" style="display: block;">
                                    <span class="header">상영관</span>
                                    <span class="data theater_name"></span>
                                </div>
                                <div class="row number" style="display: block;">
                                    <span class="header">인원</span>
                                    <span class="data"></span>
                                </div>
                            </div>

                            <!--좌석정보-->
                            <div class="info seat">
                                <div class="row seat_name d-block text-start">
                                    <span class="header">좌석명</span>
                                    <span class="data normal_seat">일반석</span>
                                </div>
                                <div class="row seat_no d-block text-start">
                                    <span class="header">좌석번호</span>
                                    <span class="data ellipsis-line3"></span>
                                </div>
                            </div>

                            <!-- 결제버튼 -->
                            <div class="tnb_step_btn_right_before" id="tnb_step_btn_right_before"></div>
                            <a class="btn-right step3" id="tnb_step_btn_right" href="#" title="결제하기"></a>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>
    
    <div id="payment_modal" class="bg-white bg-opacity-50 top-50 start-50 translate-middle d-none">
        <div id="pay_info" class="col-11 col-md-8 col-lg-7 col-xl-8 col-xxl-7 mx-auto row position-absolute start-50 top-50 translate-middle">
            <div class="d-flex justify-content-center align-items-center bg-black text-white">
                <h4 class="my-2">예매내역 확인</h4>
            </div>
            <div id="payment_ticket_info" class="col-11 col-xl-11 col-xxl-8 mx-auto row">
                <h3 class="text-center my-3">예매 정보</h3>
                <div id="movie_img" class="col-12 col-xl-5 my-3">
                    <img src="https://file.cineq.co.kr/i.aspx?movieid=<c:out value="${pydto.movieId }"/>&size=210" class="d-block mx-auto">
                </div>
                <div id="book_info" class="col-12 col-xl-7 my-3 d-flex px-0">
                    <table class="fs-5 mx-auto">
                        <tr>
                            <td class="fs-6">영화</td>
                            <td id="movie_name_zone" class="fw-bold px-3"></td>
                        </tr>
                        <tr>
                            <td class="fs-6">극장</td>
                            <td id="theater_name_zone" class="fw-bold px-3"></td>
                        </tr>
                        <tr>
                            <td class="fs-6">일시</td>
                            <td id="date_name_zone" class="fw-bold px-3"></td>
                        </tr>
                        <tr>
                            <td class="fs-6">인원</td>
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
                            <td class="fs-6">좌석</td>
                            <td id="seat_name_zone" class="fw-bold px-3"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="payment_detail" class="col-12 col-xxl-4 mx-auto pb-3">
                <h3 class="text-center my-3">결제 정보</h3>
                <div class="col-11 mx-auto">
                    <table class="fs-5 mx-auto">
                        <tr>
                            <td>결제금액</td>
                            <td class="fw-bold px-3 py-1 fs-4 text-danger"><c:out value="${pydto.pay }"/></td>
                        </tr>
                        <tr>
                            <td>결제수단</td>
                            <td id="pay_way_zone" class="fw-bold px-3 py-1 fs-4"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="book_infomation" class="col-11 mx-auto pt-3">
                <ul>
                    <li>인터넷 예매는 온라인 상으로 영화상영 시간 20분 전 까지 취소 가능하며 20분 이후에는 현장에서 취소를 하셔야 합니다.</li>
                    <li>현장 취소를 하는 경우 상영시간 이전까지만 가능하며 영화 상영 시작 시간 이후 취소나 환불은 되지 않습니다.</li>
                    <li>극장 이용 시 마스크 착용은 필수입니다.(미착용 시 입장 제한)</li>
                    <li>입장 지연에 따른 관람 불편을 취소화하기 위해 본 영화는 10분 후 상영이 시작됩니다.</li>
                </ul>
            </div>
            <div id="read_checker" class="col-11 mx-auto pt-2 px-4">
                <input type="checkbox" id="agree"> <label for="agree" class="fw-bold">상기 결제 내역을 모두 확인 했습니다.</label>
            </div>
            <div id="payment_btns" class="text-center col-11 mx-auto py-3">
                <button id="pay_sbm_btn" class="btn btn-danger" disabled>결제하기</button>
                <button id="payment_modal_close_btn" class="btn btn-outline-secondary">취소</button>
            </div>
        </div>
    </div>
    
<form action="/book/pay_auth" method="post">

<input type="hidden" id="scno" name="scno" value="<c:out value="${pydto.scno }"/>">
<input type="hidden" id="mno" name="mno" value="<c:out value="${pydto.mno }"/>">
<input type="hidden" id="movie_id" name="movieId" value="<c:out value="${pydto.movieId }"/>">
<input type="hidden" id="pay_input" name="pay" value="<c:out value="${pydto.pay }"/>">
<input type="hidden" id="adults" name="adult" value="<c:out value="${pydto.adult }"/>"/>
<input type="hidden" id="teens" name="teenager" value="<c:out value="${pydto.teenager }"/>">
<input type="hidden" id="elders" name="elder" value="<c:out value="${pydto.elder }"/>">
<input type="hidden" id="seats" name="seats" value="<c:out value="${pydto.seats }"/>">
<button id="pay_form_sbm_btn" type="submit" class="d-none">전송</button>
</form>

<div id="loading_modal" class="bg-light bg-opacity-50 d-flex justify-content-center align-items-center">
    <div class="fs-1 spinner-border text-secondary"></div>
</div>
<script src="/resources/js/book.pay.js"></script>
<jsp:include page="../common/footer.jsp"/>