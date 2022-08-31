<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<jsp:include page="header.jsp" />
<jsp:include page="../common/nav.jsp" />


<p id="movieId" style="display: none;">${movo.movieId }</p>
<p id="trailLink" style="display: none;">${movo.trailLink }</p>
<p class="d-none" id="sesNickName">${ses.nickName }</p>
<div id="contents">
	<div class="container-my1 ">
		<div class="detail_top_wrap new22">
			<div class="poster_info">
				<img class="img-"
					src="https://file.cineq.co.kr/i.aspx?movieid=${movo.movieId}&size=210">
			</div>
			<div class="tit_info">
				<span class="ic_grade gr_${movo.rate }"></span> <strong
					id="movieName">${movo.movieNm }</strong>
                <i class="bi bi-play-circle fs-3 text-danger" id="trailBtn"></i>
			</div>
			<ul class="detail_info1 ul-">
				<li class="sub_info1 li-lee">
					관람객 평점 <strong class="txt_ic_score ty2"><em>평점</em><span class="rateRatio"> 0 </span></strong>
				</li>
				<li class="sub_info2 li-lee">
					예매율 ${rank }위 <strong id="ticketRatio"></strong>
				</li>
				<li class="sub_info3 li-lee">
					누적관객수 <strong><span id="audiAcc"></span>명</strong>
				</li>
			</ul>
			<ul class="detail_info2 ul-">
				<li class="sub_info1 li-lee">
					장르 <strong><span id="genreNm"></span> / <span id="nations">한국</span>
					<span class="span-my">${movo.openDt } 개봉</span><span class="span-my">${movo.showTm }분</span></strong>
				</li>
				<li class="sub_info2 li-lee">
					감독 <strong class="line_type"><span id="directors"></span></strong>
				</li>
				<li class="sub_info3 li-lee">
					출연 <strong id="actor_list" class="line_type"></strong>
				</li>
			</ul>
			<div class="movie_detail_aside_menu type2">
				<ul class="ul-">
					<li class="area_reserve li-lee">
						<a href="/book/?movieId=${movo.movieId }"	class="btn_col1 ty7 rnd a-lee">예매하기</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- image Modal -->
	<button type="button" class="btn btn-primary" data-bs-toggle="modal"
		data-bs-target="#myModal2" id="modalBtn2" style="display: none;">
		Open modal</button>
	<div class="modal" id="myModal2">
		<div class="modal-dialog modal-xl"
			style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
			<div class="modal-content"
				style="background-color: rgba(0, 0, 0, 0); border: 0;"
				id="modalZone2"></div>
		</div>
	</div>

	<!-- Button to Open the Modal -->
	<button type="button" style="display: none;" id="modalBtn"
		class="btn btn-primary" data-bs-toggle="modal"
		data-bs-target="#myModal">Open modal</button>
	<!-- The Modal -->
	<div class="modal" id="myModal">
		<div class="modal-dialog">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title">관람평 수정</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<!-- Modal body -->
				<div class="modal-body">
					<div class="layer_contents">
					    <div class="review_write new22 starEdit">
				        	<strong class="tit_movie">${movo.movieNm }</strong>
				        	<div class="star_score_box">
						        <div class="star_info">
							        <div class="star_rate type6" id="star_rate2">
							            <button type="button" class="star starR1 on">
							            	<em>1</em>
							            </button>
							            <button type="button" class="star starR2 on">
							            	<em>2</em>
							            </button>
							            <button type="button" class="star starR1 on">
							            	<em>3</em>
							            </button>
							            <button type="button" class="star starR2 on">
							            	<em>4</em>
							            </button>
							            <button type="button" class="star starR1 on">
							            	<em>5</em>
							            </button>
							            <button type="button" class="star starR2 on">
							            	<em>6</em>
							            </button>
							            <button type="button" class="star starR1 on">
							            	<em>7</em>
							            </button>
							            <button type="button" class="star starR2">
							            	<em>8</em>
							            </button>
							            <button type="button" class="star starR1">
							            	<em>9</em>
							            </button>
							            <button type="button" class="star starR2">
						                	<em>10</em>
							            </button>
						            </div>
					            	<strong class="score_info"><em id="modRateVal"></em></strong>
						        </div>
					        </div>
				        <textarea id="txtCommentEdit" class="cmtModifiedText" cols="20" rows="6"
				        placeholder="평점 및 영화 관람평을 작성해주세요."
				        title="관람평 수정"></textarea>
						</div>
					</div>	
				</div>

				<!-- Modal footer -->
				<div class="layer_footer">
					<ul>
						<li><button type="button" class="btnCloseLayer">닫기</button></li>
						<li><button type="button" class="modSbmBtn" data-cno="">확인</button></li>
					</ul>
				</div>

			</div>
		</div>
	</div>
	
	<div class="container-my">
		<div class="tab_con">
			<div class="wrap_reviewstarscore starReg" id="movie_review_box">
				<div class="star_score_box ">
					<h4 class="h4_tit">평점 · 관람평 작성</h4>
					<div class="star_info" id="star_info">
						<div class="star_rate type5" id="star_rate">
							<button type="button" class="star starR1 on">
								<em>1</em>
							</button>
							<button type="button" class="star starR2 on">
								<em>2</em>
							</button>
							<button type="button" class="star starR1 on">
								<em>3</em>
							</button>
							<button type="button" class="star starR2 on">
								<em>4</em>
							</button>
							<button type="button" class="star starR1 on">
								<em>5</em>
							</button>
							<button type="button" class="star starR2 on">
								<em>6</em>
							</button>
							<button type="button" class="star starR1 on">
								<em>7</em>
							</button>
							<button type="button" class="star starR2 on">
								<em>8</em>
							</button>
							<button type="button" class="star starR1 on">
								<em>9</em>
							</button>
							<button type="button" class="star starR2 on">
								<em>10</em>
							</button>
						</div>
						<strong class="score_info"><em id="rateVal">10</em></strong>
					</div>
					<p class="txt_info">
						영화 관람 후 관람평 작성 시 <span class="num">L.POINT 50P</span> 적립
					</p>
				</div>
				<div class="movi_review_box">
					<div class="review_write_box">
					<span id="cmtWriter" style="display: none;">${ses.nickName }</span> 
						<textarea id="cmtText" placeholder="평점 및 영화 관람평을 작성해주세요." title="관람평 작성"></textarea>
					</div>
					<button type="submit" id="cmtSbmBtn" class="btn_submit">관람평 작성</button>
				</div>
			</div>
			<div class="movi_review_list">
				<div class="review_top">																	<!-- total(rate) / totalCount -->
					<span class="tit"><span class="txt_ic_score"><span class="starimg">관람객 평점</span><span class="num rateRatio">0</span></span> / 10</span>
					<div class="wrap_sort_right">
						<span class="total_num">총 <em id="cmtCount"></em>건 </span> <!-- comment.totalCount -->
					</div>
				</div>
				
				<ul class="review_con_list" id="review_con_list1"></ul>
				<ul class="review_con_list" id="review_con_list2"></ul>
				
				<button type="button" data-page="1" id="moreBtn" class="btn_txt_more" style="visibility: hidden;">
					<span>펼쳐보기</span>
				</button>
			</div>
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
            <div class="input-group mb-1 bg-dark">
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
<script src="/resources/js/movie.detail.js"></script>
<script src="/resources/js/movie.comment.js"></script>
<script src="https://www.youtube.com/iframe_api"></script>
<script src="/resources/js/movie.detail.chat.js"></script>
<script>
	document.addEventListener('DOMContentLoaded', function() {
		getCommentList(document.getElementById('movieId').innerText);
	});
</script>
<jsp:include page="../common/footer.jsp" />