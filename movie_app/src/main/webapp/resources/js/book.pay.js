const info_obj = {
    schedule_info: {},
    theater_info: {},
    room_info: {},
    movie_info: {}
}

async function get_info_data_from_server(scno) {
    try {
        const resp = await fetch('/book/pay/info/' + scno);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 신용카드
const card = document.getElementById('card');
const card_info = document.getElementById('card_info');
const card_alert = document.getElementById('card_alert');

// 휴대폰
const phone = document.getElementById('phone');

// 간편결제 선택
const quick_payment = document.getElementById('quick_payment');

// 네이버페이
const naver_pay = document.getElementById('naver_pay');
const naver_alert = document.getElementById('naver_alert');

// 카카오페이
const kakao_pay = document.getElementById('kakao_pay');
const kakao_alert = document.getElementById('kakao_alert');

// 내통장 결제
const mybank_book = document.getElementById('mybank_book');
const mybank_alert = document.getElementById('mybank_alert');

// 토스
const toss = document.getElementById('toss');
const toss_alert = document.getElementById('toss_alert');

async function page_loading_func() {
    await get_info_data_from_server(document.getElementById('scno').value).then(result => {
        info_obj.schedule_info = result.scvo;
        info_obj.movie_info = result.movo;
        info_obj.theater_info = result.tvo;
        info_obj.room_info = result.rvo;
    })
    let rate_name = "";
    switch (info_obj.movie_info.rate) {
        case "18": rate_name = "청소년관람불가"; break;
        case "12": case "15": rate_name = `${info_obj.movie_info.rate}세 관람가`; break;
        default: rate_name = "전체 관람가"; break;
    }
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(info_obj.schedule_info.startTime.substring(0, 10));
    let seats = document.getElementById('seats').value;
    seats = seats.replace(/-0/g, "");
    seats = seats.replace(/-/g, "");
    seats = seats.replace(/ /g, ", ");
    document.querySelector('.info.movie > .movie_poster > img').setAttribute("src", `https://file.cineq.co.kr/i.aspx?movieid=${info_obj.movie_info.movieId}&size=210`);
    document.querySelector('.info.movie > .movie_title > .data > a').setAttribute("href", `/movie/detail?movieId=${info_obj.movie_info.movieId}`);
    document.querySelector('.info.movie > .movie_title > .data > a').innerText = info_obj.movie_info.movieNm;
    document.querySelector('.info.movie > .movie_type > .data').innerText = info_obj.room_info.special;
    document.querySelector('.info.movie > .movie_rating > .data').innerText = rate_name;

    document.querySelector('.info.theater > .name > .data').innerText = info_obj.theater_info.tname;
    document.querySelector('.info.theater > .date > .data').innerText = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}(${week[date.getDay()]}) ${info_obj.schedule_info.startTime.substring(11, 16)}`;
    document.querySelector('.info.theater > .screen > .data').innerText = info_obj.theater_info.addr;
    document.querySelector('.info.seat > .seat_no > .data').innerText = seats;

    document.getElementById('movie_name_zone').innerText = info_obj.movie_info.movieNm;
    document.getElementById('theater_name_zone').innerText = info_obj.theater_info.tname;
    document.getElementById('date_name_zone').innerText = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}(${week[date.getDay()]}) ${info_obj.schedule_info.startTime.substring(11, 16)} ~ ${info_obj.schedule_info.endTime.substring(11, 16)}`;
    document.getElementById('seat_name_zone').innerText = seats;

    const adult = parseInt(document.getElementById('adults').value);
    const teenager = parseInt(document.getElementById('teens').value);
    const elder = parseInt(document.getElementById('elders').value);
    let str = "";
    str += adult > 0 ? `일반 ${adult}명` : "";
    str += adult > 0 && teenager > 0 ? ", " : "";
    str += teenager > 0 ? `청소년 ${teenager}명` : "";
    str += (adult > 0 && elder > 0) || (teenager > 0 && elder > 0) ? ", " : "";
    str += elder > 0 ? `장로 ${elder}명` : "";
    document.querySelector('.info.theater > .number > .data').innerText = str;
    loading_modal_ctrl(false);
}

document.addEventListener('DOMContentLoaded', () => {
    page_loading_func();
});

document.getElementById('tnb_step_btn_right').addEventListener('click', (e) => {
    e.preventDefault();
    const check_way = document.querySelector('#payment_zone .payment_line input[type="radio"]:checked');
    if (check_way != null) {
        if (check_way.id == 'last_pay_radio0') {
            if(document.getElementById('payment_card_radio0').checked) {
                document.getElementById('pay_way_zone').innerText = "앱 카드";
            } else if(document.getElementById('payment_card_radio1').checked) {
                document.getElementById('pay_way_zone').innerText = "일반 신용카드";
            } else {
                alert("결제 수단을 선택해주세요")
                return;
            }
        } else if(check_way.id == 'last_pay_radio1') {
            document.getElementById('pay_way_zone').innerText = "휴대폰 결제";
        } else if(check_way.id == 'last_pay_radio2') {
            if (document.getElementById('payment_card_radio2').checked) {
                document.getElementById('pay_way_zone').innerText = "네이버페이";
            } else if(document.getElementById("payment_card_radio3").checked) {
                document.getElementById('pay_way_zone').innerText = "카카오페이";
            } else {
                alert("결제 수단을 선택해주세요")
                return;
            }
        } else if(check_way.id == 'last_pay_radio3') {
            document.getElementById('pay_way_zone').innerText = "내통장결제";
        } else if(check_way.id == 'last_pay_radio4') {
            document.getElementById('pay_way_zone').innerText = "토스";
        }
    } else {
        alert("결제 수단을 선택해주세요")
        return;
    }
    document.getElementById('agree').checked = false;
    document.getElementById('payment_modal').classList.remove('d-none');
})

document.getElementById('payment_modal_close_btn').addEventListener('click', () => {
    document.getElementById('payment_modal').classList.add('d-none');
})

document.getElementById('agree').addEventListener('change', () => {
    if (document.getElementById('agree').checked) {
        document.getElementById('pay_sbm_btn').disabled = false;
    } else {
        document.getElementById('pay_sbm_btn').disabled = true;
    }
})

document.getElementById('pay_sbm_btn').addEventListener('click', () => {
    document.getElementById('pay_form_sbm_btn').click();
})

document.addEventListener('click', (e) => {
    if(e.target.id == 'payment_modal') {
        document.getElementById('payment_modal').classList.add('d-none');
    }
})

// 신용카드 결제시
document.getElementById('last_pay_radio0').addEventListener('click', (e) => {
    if (e.target.id == 'last_pay_radio0') {
        if (card.classList.contains('d-none')) {
            show_card();
            close_phone();
            close_quick_payment();
            close_naver_pay();
            close_kakao_pay();
            close_mybank_book();
            close_toss();
        } else {
            close_card();
        }
    }
});

// 휴대폰 결제시
document.getElementById('last_pay_radio1').addEventListener('click', (e) => {
    if (e.target.id == 'last_pay_radio1') {
        if (phone.classList.contains('d-none')) {
            show_phone();
            close_card();
            close_quick_payment();
            close_naver_pay();
            close_kakao_pay();
            close_mybank_book();
            close_toss();
        } else {
            close_phone();
        }
    }
});

// 간편결제 선택
document.getElementById('last_pay_radio2').addEventListener('click', (e) => {
    if (e.target.id == 'last_pay_radio2') {
        if (quick_payment.classList.contains('d-none')) {
            show_quick_payment();
            close_card();
            close_phone();
            close_mybank_book();
            close_toss();
        } else
            close_quick_payment();
    }
});


// 네이버 
document.getElementById('payment_card_radio2').addEventListener('click', (e) => {
    if (e.target.id == 'payment_card_radio2') {
        if (naver_pay.classList.contains('d-none')) {
            show_naver_pay();
            close_card();
            close_phone();
            close_kakao_pay();
            close_mybank_book();
            close_toss();
        } else {
            close_naver_pay();
        }
    }
});

// 카카오페이
document.getElementById('payment_card_radio3').addEventListener('click', (e) => {
    if (e.target.id == 'payment_card_radio3') {
        if (kakao_pay.classList.contains('d-none')) {
            show_kakao_pay();
            close_card();
            close_phone();
            close_naver_pay();
            close_mybank_book();
            close_toss();
        } else {
            close_kakao_pay();
        }
    }
});


// 내통장 결제
document.getElementById('last_pay_radio3').addEventListener('click', (e) => {
    if (e.target.id == 'last_pay_radio3') {
        if (mybank_book.classList.contains('d-none')) {
            show_mybank_book();
            close_card();
            close_phone();
            close_quick_payment();
            close_naver_pay();
            close_kakao_pay();
            close_toss();
        } else
            close_mybank_book();
    }
});


// 토스
document.getElementById('last_pay_radio4').addEventListener('click', (e) => {
    if (e.target.id == 'last_pay_radio4') {
        if (toss.classList.contains('d-none')) {
            show_toss();
            close_card();
            close_phone();
            close_quick_payment();
            close_naver_pay();
            close_kakao_pay();
            close_mybank_book();
        } else
            close_toss();
    }
});


function show_card() {
    card.classList.remove('d-none');
    card_info.classList.remove('d-none');
    card_alert.classList.remove('d-none');
}

function close_card() {
    card.classList.add('d-none');
    card_info.classList.add('d-none');
    card_alert.classList.add('d-none');
}

function show_phone() {
    phone.classList.remove('d-none');
}

function close_phone() {
    phone.classList.add('d-none');
}

function show_quick_payment() {
    quick_payment.classList.remove('d-none');
}

function close_quick_payment() {
    quick_payment.classList.add('d-none');
}

function show_naver_pay() {
    naver_pay.classList.remove('d-none');
    naver_alert.classList.remove('d-none');
}

function close_naver_pay() {
    naver_pay.classList.add('d-none');
    naver_alert.classList.add('d-none');
}

function show_kakao_pay() {
    kakao_pay.classList.remove('d-none');
    kakao_alert.classList.remove('d-none');
}

function close_kakao_pay() {
    kakao_pay.classList.add('d-none');
    kakao_alert.classList.add('d-none');
}

function show_mybank_book() {
    mybank_book.classList.remove('d-none');
    mybank_alert.classList.remove('d-none');
}

function close_mybank_book() {
    mybank_book.classList.add('d-none');
    mybank_alert.classList.add('d-none');
}

function show_toss() {
    toss.classList.remove('d-none');
    toss_alert.classList.remove('d-none');
}

function close_toss() {
    toss.classList.add('d-none');
    toss_alert.classList.add('d-none');
}

// 로딩 모달 표시 및 삭제 true: 모달 표시, false: 모달 삭제
function loading_modal_ctrl(flag = true) {
    if (flag) {
        document.getElementById('loading_modal').classList.remove('opacity-0');
        document.getElementById('loading_modal').classList.remove('pe-none');
    } else {
        document.getElementById('loading_modal').classList.add('opacity-0');
        document.getElementById('loading_modal').classList.add('pe-none');
    }
}