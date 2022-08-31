<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<jsp:include page="common/header.jsp" />
<link href="/resources/css/home.main.css" rel="stylesheet">
<jsp:include page="common/nav.jsp" />
<p class="d-none" id="sesNickName">${ses.nickName }</p>
<div class="carousel_zone py-5 bg-light">
    <div class="container">
        <div class="trail-zone">
            <!-- Carousel -->
            <div id="demo" class="carousel slide" data-bs-ride="carousel">

                <!-- Indicators/dots -->
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                </div>

                <!-- The slideshow/carousel -->
                <div class="carousel-inner">
                    <div class="carousel-item active"
                        style="background-image: url(/resources/images/tg.jpeg)">
                        <img src="/resources/images/play.png" data-movieid="20194376"
                            class="playBtn">
                    </div>
                    <div class="carousel-item"
                        style="background-image: url(/resources/images/alien.jpeg)">
                        <img src="/resources/images/play.png" data-movieid="20208446"
                            class="playBtn">
                    </div>
                    <div class="carousel-item"
                        style="background-image: url(/resources/images/hs.jpeg)">
                        <img src="/resources/images/play.png" data-movieid="20209343"
                            class="playBtn">
                    </div>
                </div>

                <!-- Left and right controls/icons -->
                <button class="carousel-control-prev" type="button"
                    data-bs-target="#demo" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button"
                    data-bs-target="#demo" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
    </div>
</div>
    <div id="contents">
        <div class="container mt-3 container-my">
            <ul id="print_area" class="movie_list ul-">
            </ul>
        </div>
    </div>



    <!-- Trailer Modal -->
    <div id="chat_modal"
        class="bg-white bg-opacity-50 d-flex justify-content-center align-items-center d-none">
        <div class="modal-cont bg-dark">
            <div class="modal-row bg-dark">
                <div id="movieZone" class="bg-dark"></div>
                <div id="rightSide">
                <div id="chatZone" class="bg-dark"></div>
                <div id="buttonZone" class="bg-dark text-warning"><span id="allChatBtn">예고편 댓글 전체보기 <i class="bi bi-caret-down-fill text-warning"></i></span></div>
            </div>
            <div class="input-group mb-2 bg-dark">
                <!-- <span class="input-group-text bg-dark text-light" id="chatId">anonymous</span> -->
                <span class="input-group-text bg-dark text-light" id="currTime">0:00</span>
                <input type="text" class="form-control bg-dark text-light" id="chatId" placeholder="닉네임 입력">
                <input type="text" class="form-control bg-dark text-light" id="chatContent" placeholder="예고편 댓글 남기기">
                <button class="btn btn-secondary" type="button" id="chatSbmBtn">확인</button>
            </div>
            <div class="bg-dark">
                <div id="allChatZone" class="bg-dark text-light"></div>
            </div>
        </div>
    </div>
    <!-- Trailer Modal End-->
</div>
<script src="https://www.youtube.com/iframe_api"></script>
<script src="/resources/js/home.trailer.js"></script>
<script src="/resources/js/movie.info.js"></script>

<jsp:include page="common/footer.jsp" />