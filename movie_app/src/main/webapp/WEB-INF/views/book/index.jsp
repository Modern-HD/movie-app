<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="header.jsp"/>
<jsp:include page="../common/nav.jsp"/>

<div class="container-fluid mt-5">
    <!-- width ~ 767: moblie, 767 ~ 1399: tablet, 1400 ~ desktop -->
    <!-- 극장 선택 -->
    <div class="col-11 col-sm-9 col-md-11 col-xl-10 col-xxl-11 mx-auto d-flex flex-wrap justify-content-center">
        <div id="theater_zone">
            <div class="row m-0 p-0">
                <div id="theater_selected"
                    class="col-12 zone-header d-flex justify-content-center align-items-center">
                    <h4 class="m-0 text-white">영화관</h4>
                </div>
                ​
                <div id="theater_btns" class="col-12 clearfix p-0">
                    <div id="all_theater_btn"
                        class="col-6 float-start d-flex justify-content-center align-items-center">
                        <h5 class="m-0">전체</h5>
                    </div>
                    <div id="special_btn"
                        class="col-6 float-start d-flex justify-content-center align-items-center opacity-33">
                        <h5 class="m-0">스페셜관</h5>
                    </div>
                </div>
                ​
                <div class="row m-0 p-0">
                    <div id="region_zone" class="p-0 col-6 bg-light">
                        <ul id="region_list" class="list-unstyled py-3">
                            <c:if test="${ses ne null }">
                            <li id="my_theater_btn" class="region-list-item px-4 py-1" data-region="my">
                                <span>My 영화관<span class="text-secondary">(<span class="region-ea"></span>)</span></span><div class="region-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div>
                            </li>
                            </c:if>
                            <li class="region-list-item px-4 py-1" data-region="0">
                                <span>서울<span class="text-secondary">(<span class="region-ea"></span>)</span></span><div class="region-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div>
                            </li>
                            <li class="region-list-item px-4 py-1" data-region="1">
                                <span>경기<span class="text-secondary">(<span class="region-ea"></span>)</span></span><div class="region-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div>
                            </li>
                            <li class="region-list-item px-4 py-1" data-region="2">
                                <span>인천<span class="text-secondary">(<span class="region-ea"></span>)</span></span><div class="region-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div>
                            </li>
                            <li class="region-list-item px-4 py-1" data-region="3">
                                <span>대구<span class="text-secondary">(<span class="region-ea"></span>)</span></span><div class="region-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div>
                            </li>
                            <li class="region-list-item px-4 py-1" data-region="4">
                                <span>부산<span class="text-secondary">(<span class="region-ea"></span>)</span></span><div class="region-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div>
                            </li>
                        </ul>
                    </div>
                    <div id="theater_list_zone" class="col-6 p-0">
                        <ul id="theater_list" class="list-unstyled py-3">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 영화 선택 -->
        <div id="movie_zone" class="bg-light">
            <div class="col-12 zone-header d-flex justify-content-center align-items-center">
                <h4 class="m-0 text-white">
                    영화 전체
                </h4>
            </div>
            <div id="movie_sort_zone" class="col-12 px-4 d-flex align-items-center">
                <select id="movie_sort" class="px-2">
                    <option value="0" selected>예매순</option>
                    <option value="1">박스오피스순</option>
<!--                     <option value="2">평점순</option> -->
                </select>
            </div>
            <ul id="movie_list_zone" class="list-unstyled"></ul>
        </div>

        <!-- 시간 선택 -->
        <div id="date_zone">
            <div class="col-12 zone-header d-flex justify-content-center align-items-center position-relative">
                <h4 class="m-0 text-white">
                    날짜/시간
                </h4>
            </div>
            <div id="calendar" class="col-12 col-md-11 mx-auto d-flex justify-content-center align-items-center">
            </div>
            <div id="date_btns" class="col-12 clearfix">
                <div id="all_date_btn" class="col-6 float-start d-flex justify-content-center align-items-center">
                    <h5>전체</h5>
                </div>
                <div id="special_date_btn" class="col-6 float-start d-flex justify-content-center align-items-center opacity-33">
                    <h5>스페셜관</h5>
                </div>
            </div>

            <div id="ticket_zone" class="col-12 pt-4 px-4 px-md-5 px-xxl-4 overflow-scroll position-relative">
                <div class="position-absolute top-50 start-50 translate-middle text-center">
                    <p class="mb-1"><i class="bi bi-camera-reels fs-1"></i></p>
                    <p class="mb-0">조회 가능한 상영 시간이 없습니다.</p>
                    <p>조건을 변경해주세요.</p>
                </div>
            </div>
        </div>
        
    </div>
</div>

<div id="loading_modal" class="bg-light bg-opacity-50 d-flex justify-content-center align-items-center">
    <div class="fs-1 spinner-border text-secondary"></div>
</div>
<script>
    const get_movie_id = `<c:out value="${movieId ne null ? movieId : ''}"/>`;
    const get_mno = `<c:out value="${ses.mno }"/>`;
</script>
<script src="/resources/js/book.index.js"></script>
<jsp:include page="../common/footer.jsp"/>