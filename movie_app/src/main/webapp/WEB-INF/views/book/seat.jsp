<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="header.jsp"/>
<jsp:include page="../common/nav.jsp"/>
<c:if test="${ses eq null}">
    <script>
        location.replace("/member/login");
    </script>
</c:if>
<div class="container mx-auto d-flex flex-wrap justify-content-center my-5">
    <div class="row m-0 p-0 d-flex flex-wrap justify-content-center">
        <div id="select_seat" class="col-12">
            <div class="mb-4 rounded-3 shadow-sm">
                <div class="tit pt-2 pb-2 d-flex justify-content-center align-items-center">
                    <h4 class="m-0 text-white fw-normal">인원 / 좌석</h4>
                    <div id="refresh_btn" class="refresh">
                        <a href="#" class="m-0 text-white fw-normal text-decoration-none"><span>다시하기 <i class="bi bi-arrow-clockwise fw-bold"></i></span></a>
                    </div>
                </div>

                <div class="d-flex flex-wrap justify-content-center">
                    <div class="row m-0 p-0 d-flex flex-wrap justify-content-center">
                        <!-- 관람인원 -->
                        <div id="" class="col-6 base">
                            <div class="max_people">
                                * 최대 8명 선택 가능
                            </div>
                            <div class="group" id="adult_group">
                                <span class="title">일반</span>
                                <ul>
                                    <li data-count="0" class="group_disabled">0</li>
                                    <li data-count="1" class="group_disabled">1</li>
                                    <li data-count="2" class="group_disabled">2</li>
                                    <li data-count="3" class="group_disabled">3</li>
                                    <li data-count="4" class="group_disabled">4</li>
                                    <li data-count="5" class="group_disabled">5</li>
                                    <li data-count="6" class="group_disabled">6</li>
                                    <li data-count="7" class="group_disabled">7</li>
                                    <li data-count="8" class="group_disabled">8</li>
                                </ul>
                            </div>
                            <div class="group" id="teenager_group">
                                <span class="title">청소년</span>
                                <ul>
                                    <li data-count="0" class="group_disabled">0</li>
                                    <li data-count="1" class="group_disabled">1</li>
                                    <li data-count="2" class="group_disabled">2</li>
                                    <li data-count="3" class="group_disabled">3</li>
                                    <li data-count="4" class="group_disabled">4</li>
                                    <li data-count="5" class="group_disabled">5</li>
                                    <li data-count="6" class="group_disabled">6</li>
                                    <li data-count="7" class="group_disabled">7</li>
                                    <li data-count="8" class="group_disabled">8</li>
                                </ul>
                            </div>
                            <div class="group" id="elder_group">
                                <span class="title">경로</span>
                                <ul>
                                    <li data-count="0" class="group_disabled">0</li>
                                    <li data-count="1" class="group_disabled">1</li>
                                    <li data-count="2" class="group_disabled">2</li>
                                    <li data-count="3" class="group_disabled">3</li>
                                    <li data-count="4" class="group_disabled">4</li>
                                    <li data-count="5" class="group_disabled">5</li>
                                    <li data-count="6" class="group_disabled">6</li>
                                    <li data-count="7" class="group_disabled">7</li>
                                    <li data-count="8" class="group_disabled">8</li>
                                </ul>
                            </div>
                            <div>
                                <a href="#" id="reservarionDiscountInfo">관람 할인 안내</a>
                            </div>
                        </div>
                        
                        <!-- 상영정보 -->
                        <div class="col-6 base">
                            <div id="user-select-info">
                                <p class="theater-info mb-1">
                                    <span class="site"></span>
                                    <span class="screen"></span>
                                </p>
                                <p class="my-1">
                                    <span class="seatNum">남은좌석 <b class="restNum text-success"></b> / <b
                                            class="totalNum text-secondary"></b></span>
                                <p>
                                <p class="playYMD-info mb-1">
                                    <span class="fw-bold date"></span><b class="exe"></b> <b class="time"></b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 좌석 미니맵 -->
                <div id="seat_zone" class="position-relative">
                    <div class="col-12">
                        <div class="col-8 tit_screen">
                            <span class="head_screen">SCREEN</span>
                        </div>
                    </div>
                    <div id="seat_list" class=" position-absolute top-50 start-50 translate-middle">
                    </div>
                    <!-- 좌석 아이콘 -->
                    <div id="seat_info" class="position-absolute p-4 start-0 top-100">
                        <div class="seat_type_box">
                            <div class="top_info d-flex">
                                <div class="seat seat_selected"></div>
                                <span>선택좌석</span>
                                <div class="seat seat_able"></div>
                                <span>선택가능</span>
                                <div class="seat seat_disabled"></div>
                                <span>예매완료</span>
                                <div class="seat seat_disabled">
                                    <i class="bi bi-x"></i>
                                </div>
                                <span>선택불가</span>
                            </div>
                        </div>
                    </div>
                    <div id="seat_blocker" class="col-12 h-100 position-absolute start-0 top-0 bg-white bg-opacity-25">
                    </div>
                </div>
                <!-- 결제 -->
                <div id="pay_section" class="col-12 position-absolute start-0">
                    <div class="tnb">
                        <a class="btn_left" href="/book/"></a>
                        <!--영화선택버튼-->
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
                            <!-- <div class="placeholder" style="display: none;"></div> -->
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
                            <!-- <div class="placeholder" style="display: none;"></div> -->
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
                            <!-- <div class="placeholder" title="좌석선택" style="display: none;"></div> -->
                        </div>
                        <!--결제금액-->
                        <div class="info payment-adult" style="width: 155px;">
                            <div class="row payment-adult pnt d-block d-none">
                                <span class="header">일반</span>
                                <span class="data"><span class="price">12,000</span>
                                    <span class="exe"> 원 X </span><span class="quantity">6</span></span>
                            </div>
                            <div class="row payment-teenager pnt d-block d-none">
                                <span class="header">청소년</span>
                                <span class="data"><span class="price">8,000</span>
                                    <span class="exe"> 원 X </span><span class="quantity">1</span></span>
                            </div>
                            <div class="row payment-elder pnt d-block d-none">
                                <span class="header">경로</span>
                                <span class="data"><span class="price">6,000</span>
                                    <span class="exe"> 원 X </span><span class="quantity">1</span></span>
                            </div>
                            <div class="payment-final pnt d-none">
                                <span class="header">총금액</span>
                                <span class="data"><span class="price">101,000</span><span
                                        class="won">원</span></span>
                                <span id="priceMapInfoIco" class="position-absolute d-none"
                                    style="right: -17px; margin-top: 3px; cursor: pointer;">
                                    <img src="http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/step2/ico_circle_14.png"
                                        height="14" width="14" alt="mappingIco">
                                </span>
                                <!-- <div id="priceMappingContainer" style="display: none; position: absolute; right: -80px; z-index: 100; width: 150px; height: auto; padding: 10px; background:
              rgb(51, 51, 51);">container!<br>container!<br>container!</div> -->
                            </div>
                        </div>
                        <!-- 결제버튼-->
                        <div class="tnb_step_btn_right_before" id="tnb_step_btn_right_before">
                            <a class="btn-right step1" id="tnb_step_btn_right" href="#" title="결제선택"></a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 할인 안내 모달-->
<div id="sales_modal" class="bg-white bg-opacity-50 d-none">
    <div class="ft_layer_popup popup_alert ko d-block position-fixed top-50 start-50 translate-middle">
        <div class="hd">
            <div class="title_area">
                <h4 class="alert_title">관람 할인 안내</h4>
            </div>
            <a href="#" class="layer_close">닫기</a>
        </div><!-- //hd -->
        <div class="bd">
            <p class="alert_msg">
            <div style="margin-bottom: 40px;">
                <h3>할인 안내</h3>
                <table style="margin: 10px 0; border-top:1px solid #999; width: 100%;">
                    <colgroup>
                        <col width="120" align="left" valign="middle">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th
                                style="text-align: left; padding-left: 5px; border-bottom: 1px solid #bbb; border-right: 1px solid #bbb;">
                                장애우대할인</th>
                            <td style="text-align: left; border-bottom: 1px solid #bbb; padding-left: 10px;">현장에서 복지카드를 소지한
                                장애인<br>
                                (장애 1~3등급: 동반 1인까지 적용 / 4~6등급: 본인에 한함 /
                                일반 2D, 3D, 4DX 영화에 한함)
                            </td>
                        </tr>
                        <tr>
                            <th
                                style="text-align: left; padding-left: 5px; border-bottom: 1px solid #bbb; border-right: 1px solid #bbb;">
                                심야할인</th>
                            <td style="text-align: left; border-bottom: 1px solid #bbb; padding-left: 10px;">극장별 심야할인 이벤트는 각
                                극장에 문의</td>
                        </tr>
                        <tr>
                            <th
                                style="text-align: left; padding-left: 5px; border-bottom: 1px solid #bbb; border-right: 1px solid #bbb;">
                                청소년 할인</th>
                            <td style="text-align: left; border-bottom: 1px solid #bbb; padding-left: 10px;">만
                                18세&nbsp;미만을&nbsp;증명할수 있는 신분증 제시<br>(만 4세 이상 ~ 만 18세&nbsp;미만의 학생 또는 청소년(어린이)에 한함)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </p>
        </div><!-- //bd -->
        <div class="ft">
            <a title="확인" href="#" class="btn btn_ok"><span>확인</span></a>
            <a title="취소" href="#" class="btn btn_white btn_close"><span>취소</span></a>
        </div><!-- //ft -->
    </div>
</div>
<form action="/book/pay" method="post">
    <input type="hidden" id="select_seats" name="seats">
    <input type="hidden" id="scno" name="scno" value="<c:out value="${scno}"/>">
    <input type="hidden" id="mno" name="mno" value="<c:out value="${ses.mno}"/>">
    <input type="hidden" id="pay" name="pay" value="0">
    <input type="hidden" id="adults" name="adult" value="0">
    <input type="hidden" id="teens" name="teenager" value="0">
    <input type="hidden" id="elders" name="elder" value="0">
    <input type="hidden" id="movie_id" name="movieId" value="0">
    <button id="seat_sbm_btn" type="submit" class="d-none"></button>
</form>
<div id="loading_modal" class="bg-light bg-opacity-50 d-flex justify-content-center align-items-center">
    <div class="fs-1 spinner-border text-secondary"></div>
</div>
<script>
    const get_scno = `<c:out value="${scno}"/>`;
    const get_birth = `<c:out value="${ses.birth}"/>`;
</script>
<script src="/resources/js/book.seat.js"></script>
<jsp:include page="../common/footer.jsp"/>