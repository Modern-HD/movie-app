<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="header.jsp"/>
<jsp:include page="../common/nav.jsp"/>
    <!-- content start -->
    <div class="container pt-3">

        <div id="favor_th_board_container" class="col-11 col-md-10 p-4 mb-5 mx-auto bg-darkness">
            <div class="h-100 overflow-hidden position-relative">
                <div class="rounded-circle-in bg-darkness start-0 top-0 translate-middle"></div>
                <div class="rounded-circle-in bg-darkness start-100 top-0 translate-middle"></div>
                <div class="rounded-circle-in bg-darkness start-0 top-100 translate-middle"></div>
                <div class="rounded-circle-in bg-darkness start-100 top-100 translate-middle"></div>
                <div id="favor_th_board" class="w-100 h-100 p-3">
                    <div class="col-12 row">
                        <div class="col-12 col-xxl-4">
                            <h1 class="text-white font-do-hyeon">자주가는 상영관</h1>
                        </div>
                        <div id="favor_th_list" class="col-12 col-xxl-8 d-flex mb-3 flex-wrap">
                            <c:forEach items="${mylist}" var="fvo">
                                <div data-tno="<c:out value="${fvo.tno }"/>" class="favor-th-list-item">OGV<c:out value="${fvo.tname }"/></div>
                            </c:forEach>
                            <div id="favor_th_conf_btn"><i class="bi bi-gear-fill"></i></div>
                        </div>
                    </div>
                    <div id="region_list_zone" class="col-12 d-flex">
                        <div data-region="0" class="region-list-item col-2 col-xl-1">서울</div>
                        <div data-region="1" class="region-list-item col-2 col-xl-1">경기</div>
                        <div data-region="2" class="region-list-item col-2 col-xl-1">인천</div>
                        <div data-region="3" class="region-list-item col-2 col-xl-1">대구</div>
                        <div data-region="4" class="region-list-item col-2 col-xl-1">부산</div>
                    </div>
                    <div id="theater_list_zone" class="py-3 d-flex flex-wrap">
                    </div>
                </div>
            </div>
        </div>

        <div id="theater_container" class="bg-light col-11 col-md-10 mx-auto mb-5">
            <h1 class="text-center font-do-hyeon mb-2">THEATER</h1>
            <div id="theater_img_zone" class="col-11 mx-auto position-relative">
                <h2 class="text-white bg-black bg-opacity-50 p-2">OGV<c:out value="${tvo.tname }"/> 
                <c:choose>
                    <c:when test="${tvo.showType eq 1 }">
                        <span class="badge fs-6 bg-secondary">4DX</span>
                    </c:when>
                    <c:when test="${tvo.showType eq 2 }">
                        <span class="badge fs-6 bg-secondary">IMAX</span>
                    </c:when>
                    <c:when test="${tvo.showType eq 3 }">
                        <span class="badge fs-6 bg-secondary">4DX</span>
                        <span class="badge fs-6 bg-secondary">IMAX</span>
                    </c:when>
                    <c:otherwise>
                    </c:otherwise>
                </c:choose>
                </h2>
                <div id="theater_info_zone" class="position-absolute top-100 col-12 bg-black bg-opacity-50 p-3">
                    <ul class="list-unstyled">
                        <li class="text-white mb-3"><c:out value="${tvo.addr }"/></li>
                        <li class="text-white mb-3"><c:out value="${tvo.totalRoom }"/>관 / <c:out value="${tvo.totalSeat }"/>석</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 시간 선택 -->
        <div id="calendar" class="col-11 mx-auto d-flex justify-content-center align-items-center">
            </div>
        <div id="ticket_zone" class="col-11 col-md-10 col-lg-9 col-xl-8 col-xxl-7 mx-auto pt-4 px-4 px-md-5 px-xxl-4 mb-5 position-relative">
            <div class="position-absolute top-50 start-50 translate-middle text-center">
                <p class="mb-1"><i class="bi bi-camera-reels fs-1"></i></p>
                <p class="mb-0">조회 가능한 상영 시간이 없습니다.</p>
            </div>
        </div>
    </div>
    <!-- content end -->

    <!-- favor theater modal -->
    <div id="favor_th_conf_modal" class="col-12 h-100 bg-black position-fixed bg-opacity-25 top-0 start-0 d-none">
        <div id="favor_th_conf_modal_container" class="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 bg-white position-absolute top-50 start-50 translate-middle">
            <h3 class="text-white p-2 mb-0 bg-darkness">자주가는 상영관 설정</h3>
            <div class="bg-light p-4">
                <p class="mb-2">
                    상영관을 선택하여 등록해주세요. 최대 5개까지 등록하실 수 있습니다.
                </p>
                <div id="select_form" class="mb-4">
                    <select id="region_select" class="text-secondary p-1 mb-2">
                        <option value="" selected disabled>지역선택</option>
                        <option value="0">서울</option>
                        <option value="1">경기</option>
                        <option value="2">인천</option>
                        <option value="3">대구</option>
                        <option value="4">부산</option>
                    </select>
                    <select id="theater_select" class="text-secondary p-1">
                        <option value="" selected disabled>극장선택</option>
                    </select>
                    <button id="favor_th_add_btn" class="btn btn-dark p-1">자주가는 상영관 추가</button>
                </div>
                <p class="mb-2">
                    김관리 님이 자주가는 상영관
                </p>
                <div id="favor_th_conf_list" class="d-flex flex-wrap pb-3">
                    <c:forEach items="${mylist}" var="fvo">
                    <div data-tno="${fvo.tno}" class="favor-th-conf-list-item position-relative">
                        <div class="px-2">OGV<c:out value="${fvo.tname }"/></div>
                        <div class="position-absolute fovor-th-del-btn"><i class="bi bi-x"></i></div>
                    </div>
                    </c:forEach>
                </div>
                <button id="modal_close_btn" class="d-block mx-auto btn btn-dark mt-3">닫기</button>
            </div>
        </div>
    </div>
<script>
    const get_mno = `<c:out value="${mno }"/>`;
    const get_tno = `<c:out value="${tvo.tno }"/>`;
    const get_tname = `<c:out value="${tvo.tname }"/>`;
    const get_region = `<c:out value="${tvo.region }"/>`;
</script>
<script src="/resources/js/theater.detail.js"></script>
<jsp:include page="../common/footer.jsp"/>