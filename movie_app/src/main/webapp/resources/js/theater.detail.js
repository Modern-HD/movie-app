const theater_obj = {}

// my 영화관 목록 가져오기
async function getMyTheaterLisFromServer(mno) {
    try {
        const resp = await fetch('/member/spread/' + mno); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function addFavorToServer(favorData) {
    try {
        const url = '/member/addFavorTh';
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(favorData)
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
async function removeFavorToServer(favorData) {
    try {
        const url = '/member/removeFavorTh';
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(favorData)
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getTheaterListFromServer(regionNum) {
    try {
        const resp = await fetch('/theater/region/'+regionNum);
        const result = await resp.json();
        return await result;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('click', (e) =>{
    if (e.target.id == "favor_th_conf_btn" || e.target.closest('#favor_th_conf_btn') != null) {
        if (get_mno == "" || parseInt(get_mno) < 1) {
            if (confirm("로그인 후 이용하실 수 있습니다.\n로그인 화면으로 이동하시겠습니까?")) {
                location.replace("/member/login");
            }
            return;
        }
        document.getElementById('favor_th_conf_modal').classList.remove('d-none');
    } else if (e.target.id == "favor_th_conf_modal") {
        document.getElementById('favor_th_conf_modal').classList.add('d-none');
    } else if (e.target.classList.contains('region-list-item')) {
        document.querySelector('.region-list-item.item-selected').classList.remove('item-selected');
        document.querySelector(`.region-list-item[data-region="${e.target.dataset.region}"]`).classList.add('item-selected');
        getTheaterListFromServer(e.target.dataset.region).then(result => {
            spreadTheaterList(result);
        });
    } else if (e.target.classList.contains('fovor-th-del-btn') || e.target.closest('.favor-th-conf-list-item') != null) {
        const tno_val = e.target.closest('.favor-th-conf-list-item').dataset.tno;
        removeFavorToServer({"mno": get_mno, "tno": tno_val}).then(result => {
            if (parseInt(result) < 1) {
                alert("오류 발생");
            } else {
                getMyTheaterLisFromServer(get_mno).then(result => {
                    spreadFavorThList(result);
                })
            }
        })
    } else if (e.target.classList.contains('favor-th-list-item')) {
        const tno_val = e.target.dataset.tno;
        location.replace(`/theater/detail?tno=${tno_val}`);
    }
})

document.getElementById('favor_th_add_btn').addEventListener('click', () => {
    const tno_val = document.getElementById('theater_select').value;
    if (get_mno == "" || parseInt(get_mno) < 1) {
        if (confirm("로그인 후 이용하실 수 있습니다.\n로그인 화면으로 이동하시겠습니까?")) {
            location.replace("/member/login");
        }
        return;
    } else if (document.querySelectorAll('.favor-th-list-item').length > 2) {
        alert("최대 3개의 상영관만 등록하실 수 있습니다.");
        return;
    } else if (document.querySelector(`.favor-th-list-item[data-tno="${tno_val}"]`) != null) {
        alert("이미 등록된 상영관입니다.");
        return;
    } else {
        addFavorToServer({"mno": get_mno, "tno": tno_val}).then(result => {
            if (parseInt(result) < 1) {
                alert("오류 발생");
            } else {
                getMyTheaterLisFromServer(get_mno).then(result => {
                    spreadFavorThList(result);
                })
            }
        });
    }
})

function spreadTheaterList(list) {
    const print_zone = document.getElementById('theater_list_zone');
    print_zone.innerHTML = "";
    let str = "";
    console.log(list);
    list.forEach(tvo => {
        str += `<a href="/theater/detail?tno=${tvo.tno}" class="theater-list-item px-2 ${tvo.tno == get_tno ? "item-selected" : ""}">OGV${tvo.tname}</a>`;
    })
    print_zone.innerHTML = str;
}

function spreadTheaterListToModal(list) {
    const print_area = document.getElementById('theater_select');
    print_area.innerHTML = "";
    let str = '<option value="" selected disabled>극장선택</option>';
    console.log(list);
    list.forEach(tvo => {
        str += `<option value="${tvo.tno}">${tvo.tname}</option>`;
    })
    print_area.innerHTML = str;
}

function spreadFavorThList(list) {
    const print_area = document.getElementById('favor_th_list');
    const modal_print_area = document.getElementById('favor_th_conf_list');
    let str1 = "";
    let str2 = "";
    list.forEach(fvo => {
        str1 += `<div data-tno="${fvo.tno}" class="favor-th-list-item">OGV${fvo.tname}</div>`;
        str2 += `<div data-tno="${fvo.tno}" class="favor-th-conf-list-item position-relative">
        <div class="px-2">OGV${fvo.tname }</div>
        <div class="position-absolute fovor-th-del-btn"><i class="bi bi-x"></i></div></div>`;
    })
    str1 += '<div id="favor_th_conf_btn"><i class="bi bi-gear-fill"></i></div>';
    print_area.innerHTML = str1;
    modal_print_area.innerHTML = str2;
}

// ---------------------- 상영 시간표 ----------------------

const book_obj = {
    date_list: [], // 서버로부터 받아온 DateDTO 배열
    date_select: 0, // 사용자가 현재 조회중인 날짜, 기본값: 0, 0: 오늘, 1:내일 ...

    theater_all_list: [],
    theater_list: [], // 서버로부터 받아온 TheaterVO 배열
    theater_select: "", // 사용자가 현재 선택한 극장(tno) 기본값: ""(선택안됨)
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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(`.region-list-item[data-region="${get_region}"]`).classList.add('item-selected');
    getTheaterListFromServer(get_region).then(result => {
        spreadTheaterList(result);
    });
    calendar_writer();
    theater_select(get_tno);

    document.getElementById('modal_close_btn').addEventListener('click', () => {
        document.getElementById('favor_th_conf_modal').classList.add('d-none');
    })
    document.getElementById('region_select').addEventListener('change', () => {
        const region_val = document.getElementById('region_select').value;
        getTheaterListFromServer(region_val).then(result => {
            spreadTheaterListToModal(result);
        });
    });
})

document.addEventListener('click', (e) => {
    // 사용자가 날짜 클릭시
    if(e.target.classList.contains('calendar-item') || e.target.closest('.calendar-item') != null) {
        const date_idx = e.target.classList.contains('calendar-item') ? parseInt(e.target.dataset.dateIdx) : parseInt(e.target.closest('.calendar-item').dataset.dateIdx);
        calendar_select(date_idx);
    }
});

// DateDTO 가져오기
async function theater_select(tno) {
    book_obj.theater_select = tno;
    await get_date_data_from_server(book_obj.theater_select, book_obj.movie_select).then(result => {
        book_obj.date_list = result;
    });
    refresh_calendar_opacity();
    auto_calendar_select();
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
        str += `<div class="calendar-item opacity-33 text-center px-3 mx-1 ${day.getDay() == 0 ? 'text-danger' : day.getDay() == 6 ? 'text-primary' : ''}" data-date-idx="${i}">
        <span class="calendar-item-date m-0 fs-2">${day.getDate()}</span> <span class="fs-3 m-0">${week[day.getDay()]}</span></div>`
    }
    calendar_zone.innerHTML = str;
    calendar_select(0);
}

// 날짜 변경시 book_obj 변경과 해당 날짜에 선택 효과 처리
function calendar_select(date_idx) {
    book_obj.date_select = date_idx;
    document.querySelectorAll('.calendar-item').forEach(el => {
        el.classList.remove('date-selected')
    })
    document.querySelector(`.calendar-item[data-date-idx="${date_idx}"]`).classList.add('date-selected');
    refresh_ticket_list();
}

// 상영하는 날짜가 있으면 그 날짜로 자동 이동
function auto_calendar_select() {
    const auto_move = document.querySelector('.calendar-item:not(.opacity-33)');
    if (auto_move != null) {
        auto_move.click();
    }
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

async function refresh_ticket_list() {
    const ticket_zone = document.getElementById('ticket_zone');
    let str = "";
    if (book_obj.date_list.length < 1 || book_obj.date_list[book_obj.date_select].tkdto.length < 1) {
        str += '<div class="mt-3 position-absolute top-50 start-50 translate-middle text-center">';
        str += '<p class="mb-1"><i class="bi bi-camera-reels fs-1"></i></p>';
        str += '<p class="mb-0">조회 가능한 상영 시간이 없습니다.</p></div>';
        ticket_zone.innerHTML = str;
        return;
    }
    book_obj.date_list[book_obj.date_select].tkdto.forEach(tkdto => {
        let rate_name = "";
        switch (tkdto.movo.rate) {
            case "18": rate_name = "청불"; break;
            case "12": case "15": rate_name = tkdto.movo.rate; break;
            default: rate_name = "전체"; break;
        }
        str += `<div class="ticket-item mb-4">`;
        str += `<div><span class="ic_grade gr_${tkdto.movo.rate.toLowerCase()}">${rate_name}</span><span class="fs-5 text-black fw-bold">${tkdto.movo.movieNm}</span></div>`;
        tkdto.rdtoList.forEach(rdto => {
            str += `<div class="room-item">`;
            str += `<div class="mx-1 mt-3 mb-2">${rdto.rvo.special}</div>`;
            str += `<div class="schedule-zone d-flex flex-wrap">`;
            rdto.scvoList.forEach(scvo => {
                str += `<a href="/book/seating/${scvo.scno}" class="schedule-item position-relative p-1 m-1 d-block text-black text-decoration-none" data-scno="${scvo.scno}">`;
                str += `<div class="fw-bold fs-6 text-center">${scvo.startTime.substring(11, 16)}</div>`;
                str += `<div class="col-10 mx-auto"><div class="float-start schedule-item-seat">`;
                str += `<span class="text-success fw-bold">${scvo.emptySeat} </span><span class="text-muted">/ ${scvo.totalSeat}</span></div>`;
                str += `<div class="float-end schedule-item-room"><span>${rdto.rvo.rname}</span></div></div>`;
                str += `<div class="schedule-tooltip position-absolute start-50 translate-middle-x d-none">종료 ${scvo.endTime.substring(11, 16)}</div>`;
                str += `</a>`;
            })
            str += `</div>`;
            str += `</div>`;
        });
        str += `</div>`;
    })
    ticket_zone.innerHTML = str;
}