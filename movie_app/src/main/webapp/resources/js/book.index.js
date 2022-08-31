const book_obj = {
    date_list: [], // 서버로부터 받아온 DateDTO 배열
    date_select: 0, // 사용자가 현재 조회중인 날짜, 기본값: 0, 0: 오늘, 1:내일 ...

    region_select: "0",
    theater_all_list: [],
    my_theater_list: [],
    theater_list: [], // 서버로부터 받아온 TheaterVO 배열
    theater_select: "", // 사용자가 현재 선택한 극장(tno) 기본값: ""(선택안됨)

    movie_avail_list: new Set(),
    movie_list: [], // 서버로부터 받아온 MovieVO 배열
    movie_select: ""// 사용자가 선택힌 movie_id
}

// 전체 TheaterVO 가져오기
async function get_all_theater_data_from_server() {
    try {
        const resp = await fetch('/book/theaters/'); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

// TheaterVO 가져오기
async function get_theater_data_from_server(movie_id = "") {
    try {
        const resp = await fetch('/book/theater/' + movie_id); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

// 특별관을 보유한 TheaterVO 가져오기
async function get_special_list_from_server(movie_id = "") {
    try {
        const resp = await fetch('/book/special/' + movie_id); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// my 영화관 목록 가져오기
async function get_my_theater_list_from_server(mno) {
    try {
        const resp = await fetch('/book/mytheater/' + mno); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// DateDTO 배열 가져오기
async function get_date_data_from_server(tno, movie_id = "") {
    try {
        const resp = await fetch('/book/date/' + tno + '/' + movie_id); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// MovieVO 배열 가져오기
async function get_movie_list_from_server() {
    try {
        const resp = await fetch('/book/movie/'); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// api 박스오피스 가져오기
async function get_box_office_from_server(date) {
    try {
        const resp = await fetch('/movieAPI/box/' + date); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 로딩 함수
async function page_loading_func() {
    await get_movie_list_from_server().then(result => {
        console.log(result);
        book_obj.movie_list = result;
    });
    await get_all_theater_data_from_server().then(result => {
        book_obj.theater_all_list = result;
    })
    if(get_mno != null && get_mno != "") {
        await get_my_theater_list_from_server(get_mno).then(result => {
            book_obj.my_theater_list = result;
        })
    }
    // /book/?movieId=20205362 형태로 접속하였을 때
    if (get_movie_id != null && get_movie_id != "") {
        book_obj.movie_select = get_movie_id;
        await get_theater_data_from_server(get_movie_id).then(result => {
            book_obj.theater_list = result;
            movie_select(book_obj.movie_select);
        });
    } else { // /book 형태로 파라미터 없이 접속하였을 때
        await get_theater_data_from_server().then(result => {
            book_obj.theater_list = result;
        })
    }
    await refresh_region_ea();
    await refresh_movie_list(0);
    refresh_theater_list();
    calendar_writer();
    await loading_modal_ctrl(false);
}

// 페이지 로드 시 처리
document.addEventListener('DOMContentLoaded', () => {
    page_loading_func();
});

// 사용자가 영화 정렬 순서 변경
document.getElementById('movie_sort').addEventListener('change', () => {
    loading_modal_ctrl(true);
    refresh_movie_list(parseInt(document.getElementById('movie_sort').value));
});

document.getElementById('all_theater_btn').addEventListener('click', () => {
    const special_btn = document.getElementById('all_theater_btn');
    if(special_btn.classList.contains('opacity-33')) {
        loading_modal_ctrl(true);
        special_btn.classList.remove('opacity-33');
        document.getElementById('special_btn').classList.add('opacity-33');
        theater_getter(book_obj.movie_select).then(() => {
            loading_modal_ctrl(false);
        })
    }
});

document.getElementById('special_btn').addEventListener('click', () => {
    const special_btn = document.getElementById('special_btn');
    if(special_btn.classList.contains('opacity-33')) {
        loading_modal_ctrl(true);
        special_btn.classList.remove('opacity-33');
        document.getElementById('all_theater_btn').classList.add('opacity-33');
        theater_getter(book_obj.movie_select).then(() => {
            loading_modal_ctrl(false);
        })
    }
});

document.getElementById('all_date_btn').addEventListener('click', () => {
    const all_date_btn = document.getElementById('all_date_btn');
    if(all_date_btn.classList.contains('opacity-33')) {
        all_date_btn.classList.remove('opacity-33');
        document.getElementById('special_date_btn').classList.add('opacity-33');
        refresh_ticket_list();
    }
})

document.getElementById('special_date_btn').addEventListener('click', () => {
    const special_date_btn = document.getElementById('special_date_btn');
    if(special_date_btn.classList.contains('opacity-33')) {
        special_date_btn.classList.remove('opacity-33');
        document.getElementById('all_date_btn').classList.add('opacity-33');
        refresh_ticket_list();
    }
})

// 클릭처리
document.addEventListener('click', (e) => {
    // 사용자가 날짜 클릭시
    if(e.target.classList.contains('calendar-item') || e.target.closest('.calendar-item') != null) {
        const date_idx = e.target.classList.contains('calendar-item') ? parseInt(e.target.dataset.dateIdx) : parseInt(e.target.closest('.calendar-item').dataset.dateIdx);
        calendar_select(date_idx);
    }
    // 사용자가 영화 클릭시
    else if (e.target.classList.contains('movie-list-item') || e.target.closest('.movie-list-item') != null) {
        loading_modal_ctrl(true);
        const movie_id = e.target.classList.contains('movie-list-item') ? e.target.dataset.movieId : e.target.closest('.movie-list-item').dataset.movieId;
        movie_select(movie_id);
    }
    // 사용자가 지역 클릭시
    else if (e.target.classList.contains('region-list-item') || e.target.closest('.region-list-item') != null) {
        loading_modal_ctrl(true);
        const region_val = e.target.classList.contains('region-list-item') ? e.target.dataset.region : e.target.closest('.region-list-item').dataset.region;
        book_obj.region_select = region_val;
        document.querySelectorAll('.region-list-item.region-selected').forEach(el => {
            el.classList.remove('region-selected');
        })
        if (region_val == "my") {
            document.getElementById('my_theater_btn').classList.add('region-selected');
        } else {
            document.querySelector(`.region-list-item[data-region="${region_val}"]`).classList.add('region-selected');
        }
        refresh_theater_list();
    }
    // 사용자가 극장 선택시
    else if (e.target.classList.contains('theater-list-item') || e.target.closest('.theater-list-item') != null) {
        loading_modal_ctrl(true);
        const tno_val = e.target.classList.contains('theater-list-item') ? e.target.dataset.tno : e.target.closest('.theater-list-item').dataset.tno
        theater_select(tno_val);
    }
});

// 마우스 오버
document.addEventListener('mouseover', (e) => {
    if(e.target.classList.contains('schedule-item') || e.target.closest('.schedule-item') != null) {
        const scno_val = e.target.classList.contains('schedule-item') ? e.target.dataset.scno : e.target.closest('.schedule-item').dataset.scno;
        document.querySelector(`.schedule-item[data-scno="${scno_val}"] > .schedule-tooltip`).classList.remove('d-none');
    }
})

// 마우스 아웃
document.addEventListener('mouseout', (e) => {
    if(e.target.classList.contains('schedule-item') || e.target.closest('.schedule-item') != null) {
        document.querySelectorAll('.schedule-item > .schedule-tooltip').forEach(el => {
            el.classList.add('d-none');
        })
    }
})

// 영화 목록 새로고침 파라미터, 타입 0: 예매순 정렬, 타입 1: 박스오피스 순, 타입2 : 평점 순
async function refresh_movie_list(type = 0) {
    switch (type) {
        case 0:
            book_obj.movie_list.sort(function(a, b){return b.ticket - a.ticket})
            break;
        case 1: 
            book_obj.movie_list.sort(function(a, b){return b.ticket - a.ticket}) // 박스 오피스 정렬도 기본적으로 예매순 정렬 시행(영화가 박스오피스 순위권 밖일 수도 있기 때문)
            await movie_list_sort_by_boxoffice();
            break;
        default:
            break;
    }
    await movie_list_write();
    if (book_obj.date_list.length > 0) {
        refresh_movie_opacity();
    }
    auto_add_movie_selected_class();
    await loading_modal_ctrl(false);
}

// 박스 오피스 정렬
async function movie_list_sort_by_boxoffice() {
    const now = new Date();
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    let year = yesterday.getFullYear();
    let month = yesterday.getMonth() + 1;
    let day = yesterday.getDate();
    console.log(year + (month < 10 ? "0" + month : month.toString()) + (day < 10 ? "0" + day : day.toString()));
    await get_box_office_from_server(year + (month < 10 ? "0" + month : month.toString()) + (day < 10 ? "0" + day : day.toString())).then(result => {
        for (let i = 9; i >= 0; i--) {
            for(let j = 0; j < book_obj.movie_list.length; j++) {
                if(result.boxOfficeResult.dailyBoxOfficeList[i].movieCd == book_obj.movie_list[j].movieId) {
                    let temp = book_obj.movie_list[j];
                    book_obj.movie_list.splice(j, 1);
                    book_obj.movie_list.unshift(temp);
                    break;
                }
            }
        }
    });
}

// 영화 리스트 뿌리기
async function movie_list_write() {
    const movie_list_zone = document.getElementById("movie_list_zone");
    movie_list_zone.innerHTML = "";
    let str = "";
    book_obj.movie_list.forEach(el => {
        let rate_name = "";
        switch (el.rate) {
            case "18": rate_name = "청불"; break;
            case "12": case "15": rate_name = el.rate; break;
            default: rate_name = "전체"; break;
        }
        str += `<li class="movie-list-item" data-movie-id="${el.movieId}">`;
        str += `<span class="ic_grade gr_${el.rate.toLowerCase()}">${rate_name}</span>`;
        str += `<span class="fs-6 fw-bold">${el.movieNm}</span>`;
        str += `<div class="movie-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div></li>`;
    })
    movie_list_zone.innerHTML = str;
}

// 영화 이름 opacity 제어
function refresh_movie_opacity() {
    document.querySelectorAll('#movie_list_zone li').forEach((el) => {
        el.classList.add('opacity-50');
    })
    book_obj.movie_avail_list.forEach(val => {
        document.querySelector(`#movie_list_zone li[data-movie-id="${val}"]`).classList.remove('opacity-50');
    })
}

async function movie_select(movie_id) {
    book_obj.movie_select = movie_id;
    auto_add_movie_selected_class();
    await theater_getter(movie_id);
    for (let i = 0; i < book_obj.movie_list.length; i++) {
        if (book_obj.movie_list[i].movieId.toString() == book_obj.movie_select) {
            document.querySelector('#movie_zone > .zone-header > h4').innerText = book_obj.movie_list[i].movieNm;
            break;
        }
    }
    await loading_modal_ctrl(true);
    if (book_obj.theater_select != "") {
        await get_date_data_from_server(book_obj.theater_select, book_obj.movie_select).then(result => {
            book_obj.date_list = result;
        });
        refresh_calendar_opacity();
        await refresh_ticket_list();
        auto_calendar_select();
    }
    await loading_modal_ctrl(false);
}

// 극장 리스트 새로 고침
async function refresh_region_ea() {
    if (get_mno != null && get_mno != "") {
        let cnt = 0;
        for(let i = 0; i < book_obj.my_theater_list.length; i++) {
            for (let j = 0; j < book_obj.theater_list.length; j++) {
                if (book_obj.my_theater_list[i].tno == book_obj.theater_list[j].tno) {
                    cnt++;
                    break;
                }
            }
        }
        document.querySelector('#my_theater_btn .region-ea').innerText = cnt;
    }
    document.querySelectorAll('.region-list-item').forEach(el => {
        const region_val = el.dataset.region;
        if(region_val != "my" && region_val >= 0) {
            let cnt = 0;
            for(let i = 0; i < book_obj.theater_list.length; i++) {
                if (book_obj.theater_list[i].region == region_val) {cnt++};
            }
            document.querySelector(`.region-list-item[data-region="${region_val}"] .region-ea`).innerText = cnt;
        }
    });
}

async function refresh_theater_list() {
    const theater_list_zone = document.getElementById('theater_list');
    str = "";
    if (book_obj.region_select == "my") {
        book_obj.my_theater_list.forEach(e => {
            let avail = false;
            book_obj.theater_list.forEach(el => {
                if (e.tno == el.tno) {avail = true};
            })
            str += `<li class="theater-list-item px-4 py-1 ${avail ? "" : "opacity-50"} ${e.tno == book_obj.theater_select ? "theater-selected" : ""}" data-tno="${e.tno}">${e.tname}<div class="theater-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div></li>`
        })
    } else {
        book_obj.theater_all_list.forEach(e => {
            if (e.region == book_obj.region_select) {
                let avail = false;
                book_obj.theater_list.forEach(el => {
                    if (e.tno == el.tno) {avail = true};
                })
                str += `<li class="theater-list-item px-4 py-1 ${avail ? "" : "opacity-50"} ${e.tno == book_obj.theater_select ? "theater-selected" : ""}" data-tno="${e.tno}">${e.tname}<div class="theater-check-icon position-absolute"><i class="bi bi-check-lg fs-3"></i></div></li>`
            }
        })
    }
    theater_list_zone.innerHTML = str;
    await loading_modal_ctrl(false);
}

async function theater_getter(movie_id) {
    if (!document.getElementById('all_theater_btn').classList.contains('opacity-33')) {
        await get_theater_data_from_server(movie_id).then(result => {
            book_obj.theater_list = result;
            refresh_region_ea();
            refresh_theater_list();
        })
    } else {
        await get_special_list_from_server(movie_id).then(result => {
            book_obj.theater_list = result;
            refresh_region_ea();
            refresh_theater_list();
        })
    }
}

// DateDTO 가져오기
async function theater_select(tno) {
    await loading_modal_ctrl(true);
    book_obj.theater_select = tno;
    book_obj.movie_select = "";
    await theater_getter(book_obj.movie_select);
    auto_add_movie_selected_class();
    for(let i = 0; i < book_obj.theater_all_list.length; i++) {
        if (book_obj.theater_all_list[i].tno.toString() == book_obj.theater_select) {
            document.querySelector('#theater_selected > h4').innerText = book_obj.theater_all_list[i].tname;
            break;
        }
    }
    await loading_modal_ctrl(true);
    await get_date_data_from_server(book_obj.theater_select, book_obj.movie_select).then(result => {
        book_obj.date_list = result;
    })
    document.querySelector('#movie_zone > .zone-header > h4').innerText = "영화 선택";
    refresh_movie_avail();
    refresh_movie_opacity();
    refresh_calendar_opacity();
    await refresh_theater_list();
    await refresh_region_ea();
    auto_calendar_select();
    loading_modal_ctrl(false);
}

async function refresh_ticket_list() {
    const ticket_zone = document.getElementById('ticket_zone');
    let str = "";
    if (book_obj.date_list.length < 1 || book_obj.date_list[book_obj.date_select].tkdto.length < 1) {
        str += '<div class="position-absolute top-50 start-50 translate-middle text-center">';
        str += '<p class="mb-1"><i class="bi bi-camera-reels fs-1"></i></p>';
        str += '<p class="mb-0">조회 가능한 상영 시간이 없습니다.</p>';
        str += '<p>조건을 변경해주세요.</p>';
        ticket_zone.innerHTML = str;
        return;
    }
    const filter = document.getElementById('all_date_btn').classList.contains('opacity-33');
    book_obj.date_list[book_obj.date_select].tkdto.forEach(tkdto => {
        let rate_name = "";
        switch (tkdto.movo.rate) {
            case "18": rate_name = "청불"; break;
            case "12": case "15": rate_name = tkdto.movo.rate; break;
            default: rate_name = "전체"; break;
        }
        let tkdto_str = "";
        let flag = true;
        tkdto_str += `<div class="ticket-item mb-4">`;
        tkdto_str += `<div><span class="ic_grade gr_${tkdto.movo.rate.toLowerCase()}">${rate_name}</span><span class="fs-5 fw-bold">${tkdto.movo.movieNm}</span></div>`;
        tkdto.rdtoList.forEach(rdto => {
            let rdto_str = "";
            rdto_str += `<div class="room-item">`;
            rdto_str += `<div class="mx-1 mt-3 mb-2">${rdto.rvo.special}</div>`;
            rdto_str += `<div class="schedule-zone d-flex flex-wrap">`;
            rdto.scdtoList.forEach(scdto => {
                let scdto_str = ""
                scdto_str += `<a href="/book/seating/${scdto.scvo.scno}" class="schedule-item position-relative p-1 m-1 d-block text-black text-decoration-none" data-scno="${scdto.scvo.scno}">`;
                scdto_str += `<div class="fw-bold fs-6 text-center">${scdto.scvo.startTime.substring(11, 16)}</div>`;
                scdto_str += `<div class="col-10 mx-auto"><div class="float-start schedule-item-seat">`;
                scdto_str += `<span class="text-success fw-bold">${scdto.totalEmptyCount} </span><span class="text-muted">/ ${scdto.totalSeatCount}</span></div>`;
                scdto_str += `<div class="float-end schedule-item-room"><span>${rdto.rvo.rname}</span></div></div>`;
                scdto_str += `<div class="schedule-tooltip position-absolute start-50 translate-middle-x d-none">종료 ${scdto.scvo.endTime.substring(11, 16)}</div>`;
                scdto_str += `</a>`;
                rdto_str += scdto_str;
            })
            rdto_str += `</div>`;
            rdto_str += `</div>`;
            if (filter) {
                if (rdto.rvo.special == '2D') {
                    rdto_str = "";
                } else {
                    flag = false;
                }
            }
            tkdto_str += rdto_str;
        });
        tkdto_str += `</div>`;
        if (filter && flag) {
            tkdto_str = "";
        }
        str += tkdto_str;
    })
    if (str == "") {
        str += '<div class="position-absolute top-50 start-50 translate-middle text-center">';
        str += '<p class="mb-1"><i class="bi bi-camera-reels fs-1"></i></p>';
        str += '<p class="mb-0">조회 가능한 상영 시간이 없습니다.</p>';
        str += '<p>조건을 변경해주세요.</p>';
    }
    ticket_zone.innerHTML = str;
}

async function refresh_movie_avail() {
    book_obj.movie_avail_list.clear();
    book_obj.date_list.forEach(e => {
        e.tkdto.forEach(el => {
            book_obj.movie_avail_list.add(el.movo.movieId);
        })
    })
}

// 캘린더 안의 날짜 opacity 제어
function refresh_calendar_opacity() {
    document.querySelectorAll('.calendar-item').forEach((el) => {
        el.classList.add('opacity-33');
    })
    for (let i = 0; i < 7; i++) {
        if (book_obj.date_list[i].tkdto.length > 0) {
            document.querySelector(`.calendar-item[data-date-idx="${i}"]`).classList.remove('opacity-33');
        }
    }
}

// 페이지 로딩 시 캘린더 생성
function calendar_writer() {
    const calendar_zone = document.getElementById('calendar');
    calendar_zone.innerHTML = "";
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let = str = "";
    for (let i = 0; i < 7; i++) {
        const now = new Date();
        const day = new Date(now.setDate(now.getDate() + i));
        str += `<div class="calendar-item opacity-33 text-center mx-1 mx-md-3 mx-xxl-2 ${day.getDay() == 0 ? 'text-danger' : day.getDay() == 6 ? 'text-primary' : ''}" data-date-idx="${i}">
        <p class="m-0 rounded-circle">${day.getDate()}</p><p class="fs-5 m-0">${week[day.getDay()]}</p></div>`
    }
    calendar_zone.innerHTML = str;
    calendar_select(0);
}

// 날짜 변경시 book_obj 변경과 해당 날짜에 선택 효과 처리
function calendar_select(date_idx) {
    book_obj.date_select = date_idx;
    document.querySelectorAll('.calendar-item > .rounded-circle.date-selected').forEach(el => {
        el.classList.remove('date-selected')
    })
    document.querySelector(`.calendar-item[data-date-idx="${date_idx}"] > .rounded-circle`).classList.add('date-selected');
    const now = new Date();
    const date_wirter = new Date(now.setDate(now.getDate() + date_idx));
    let year = date_wirter.getFullYear();
    let month = date_wirter.getMonth() + 1;
    let day = date_wirter.getDate();
    document.querySelector('#date_zone > .zone-header > h4').innerText = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    refresh_ticket_list();
}

// 상영하는 날짜가 있으면 그 날짜로 자동 이동
function auto_calendar_select() {
    const auto_move = document.querySelector('.calendar-item:not(.opacity-33)');
    if (auto_move != null) {
        auto_move.click();
    }
}

function auto_add_movie_selected_class() {
    document.querySelectorAll('.movie-list-item.movie-selected').forEach(el => {
        el.classList.remove('movie-selected');
    });
    if (book_obj.movie_select != "") {
        document.querySelector(`.movie-list-item[data-movie-id="${book_obj.movie_select}"]`).classList.add('movie-selected');
    }
}

// 로딩 모달 표시 및 삭제 true: 모달 표시, false: 모달 삭제
async function loading_modal_ctrl(flag = true) {
    if (flag) {
        document.getElementById('loading_modal').classList.remove('opacity-0');
        document.getElementById('loading_modal').classList.remove('pe-none');
    } else {
        document.getElementById('loading_modal').classList.add('opacity-0');
        document.getElementById('loading_modal').classList.add('pe-none');
    }
}