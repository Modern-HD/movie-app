const seat_obj = {
    theater_info: {},
    movie_info: {},
    room_info: {},
    schedule_info: {},
    scno: get_scno,
    seat_list: [],
    rate: [],
    selected_count: 0,
    adult: 0,
    teenager: 0,
    elder: 0
}

// SeatDTO 객체 가져오기
async function get_seat_data_from_server(scno) {
    try {
        const resp = await fetch('/book/seat/' + scno); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function page_loading_func() {
    await get_seat_data_from_server(seat_obj.scno).then(result => {
        seat_obj.theater_info = result.tvo;
        seat_obj.movie_info = result.movo;
        seat_obj.room_info = result.rvo;
        seat_obj.schedule_info = result.scdto;
        seat_obj.seat_list = result.svoList;
        seat_obj.rate.push('adult');
        if(seat_obj.movie_info.rate != '18') {
            seat_obj.rate.push('teenager');
            seat_obj.rate.push('elder');
        }
    });
    age_valid_check();
    await seat_list_writer();
    person_group_add_event();
    write_schedule_info();
    loading_modal_ctrl(false);
}

document.addEventListener('DOMContentLoaded', () => {
    page_loading_func();
})

document.getElementById('refresh_btn').addEventListener('click', () => {
    location.reload();
})

document.getElementById('tnb_step_btn_right').addEventListener('click', (e) => {
    e.preventDefault();
    const total_count = seat_obj.adult + seat_obj.elder + seat_obj.teenager;
    if (total_count == seat_obj.selected_count && seat_obj.selected_count > 0) {
        document.getElementById('seat_sbm_btn').click();
    } else {
        alert("좌석 선택이 완료되지 않았습니다.")
    }
})

document.getElementById('reservarionDiscountInfo').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("sales_modal").classList.remove('d-none');
})

document.querySelectorAll('#sales_modal a').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("sales_modal").classList.add('d-none');
    })
})

document.addEventListener('click', (e) => {
    e.target.classList.add('pe-none');
    if (e.target.classList.contains('seat_hovered')) {
        loading_modal_ctrl(true);
        const hovered_seats  = document.querySelectorAll('.seat_hovered');
        for (let i = 0; i < hovered_seats.length; i++) {
            seat_obj.selected_count++;
            hovered_seats[i].classList.remove('seat_hovered');
            hovered_seats[i].classList.remove('seat_able');
            hovered_seats[i].classList.add('seat_selected');
            if (hovered_seats.length > 1) {
                hovered_seats[i].dataset.set = `${hovered_seats[hovered_seats.length - 1 - i].dataset.sid}`;
            }
        }
        single_and_comple_checker();
        get_selected_seats();
        calculate_pay();
        loading_modal_ctrl(false);
    } else if (e.target.classList.contains('seat_selected')) {
        loading_modal_ctrl(true);
        seat_obj.selected_count--;
        e.target.classList.remove('seat_selected');
        e.target.classList.add('seat_able');
        if (e.target.dataset.set != undefined && e.target.dataset.set != "") {
            const set_seat = document.querySelector(`.seat_selected[data-sid="${e.target.dataset.set}"]`);
            console.log(set_seat);
            seat_obj.selected_count--;
            set_seat.classList.remove('seat_selected');
            set_seat.classList.add('seat_able');
            delete e.target.dataset.set;
            delete set_seat.dataset.set;
        }
        single_and_comple_checker();
        get_selected_seats();
        calculate_pay();
        loading_modal_ctrl(false);
    }
    e.target.classList.remove('pe-none');
})

document.addEventListener('mouseover', (e) => {
    remove_hovers();
    const total_count = seat_obj.adult + seat_obj.elder + seat_obj.teenager;
    if (seat_obj.selected_count < total_count) {
        if (e.target.dataset.sid != null && e.target.classList.contains('seat_able')) {
            e.target.classList.add('seat_hovered');
            if (total_count - seat_obj.selected_count > 1) {
                const target_row = e.target.dataset.sid.substring(0, e.target.dataset.sid.indexOf("-"));
                const target_col = parseInt(e.target.dataset.sid.substring(e.target.dataset.sid.indexOf("-")+1));
                let plus = target_col % 2 == 0 ? 1 : -1;
                if (e.target.dataset.start % 2 == 0) {
                    plus *= -1;
                }
                const frist = document.querySelector(`.seat_able[data-sid="${target_row}-${lpad(target_col-plus, 2, "0")}"]`);
                const secon = document.querySelector(`.seat_able[data-sid="${target_row}-${lpad(target_col+plus, 2, "0")}"]`);
                if (frist != null && frist.classList.contains('seat_able') && frist.dataset.start == e.target.dataset.start) {
                    frist.classList.add('seat_hovered');
                } else if(secon != null && secon.classList.contains('seat_able') && secon.dataset.start == e.target.dataset.start) {
                    secon.classList.add('seat_hovered');
                }
            }
        }
    }
})

function write_schedule_info() {
    const date = new Date(seat_obj.schedule_info.scvo.startTime.substring(0, 11));
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    let rate_name = "";
    switch (seat_obj.movie_info.rate) {
        case "18": rate_name = "청소년관람불가"; break;
        case "12": case "15": rate_name = `${seat_obj.movie_info.rate}세 관람가`; break;
        default: rate_name = "전체 관람가"; break;
    }
    document.querySelector('.theater-info > .site').innerText = seat_obj.theater_info.tname;
    document.querySelector('.theater-info > .screen').innerText = seat_obj.theater_info.addr;
    document.querySelector('.playYMD-info > .date').innerText = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
    document.querySelector('.playYMD-info > .exe').innerText = `(${week[date.getDay()]})`;
    document.querySelector('.playYMD-info > .time').innerText = `${seat_obj.schedule_info.scvo.startTime.substring(11, 16)} ~ ${seat_obj.schedule_info.scvo.endTime.substring(11, 16)}`;
    document.querySelector('#user-select-info .restNum').innerText = seat_obj.schedule_info.totalEmptyCount;
    document.querySelector('#user-select-info .totalNum').innerText = seat_obj.schedule_info.totalSeatCount;

    document.querySelector('.info.movie > .movie_poster > img').setAttribute("src", `https://file.cineq.co.kr/i.aspx?movieid=${seat_obj.movie_info.movieId}&size=210`);
    document.querySelector('.info.movie > .movie_title > .data > a').setAttribute("href", `/movie/detail?movieId=${seat_obj.movie_info.movieId}`);
    document.querySelector('.info.movie > .movie_title > .data > a').innerText = seat_obj.movie_info.movieNm;
    document.querySelector('.info.movie > .movie_type > .data').innerText = seat_obj.room_info.special;
    document.querySelector('.info.movie > .movie_rating > .data').innerText = rate_name;

    document.querySelector('.info.theater > .name > .data').innerText = seat_obj.theater_info.tname;
    document.querySelector('.info.theater > .date > .data').innerText = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}(${week[date.getDay()]}) ${seat_obj.schedule_info.scvo.startTime.substring(11, 16)}`;
    document.querySelector('.info.theater > .screen > .data').innerText = seat_obj.theater_info.addr;

    document.getElementById('movie_id').value = seat_obj.movie_info.movieId;
}

function person_group_add_event() {
    for (let i = 0; i < seat_obj.rate.length; i++) {
        document.querySelectorAll(`#${seat_obj.rate[i]}_group > ul > li`).forEach(el => {
            el.classList.remove('group_disabled');
            if (el.dataset.count > 0) {
                el.classList.add('group_counter');
            } else {
                el.classList.add('group_selected');
            }
            el.addEventListener('click', () => {
                const adult = seat_obj.rate[i] == "adult" ? parseInt(el.dataset.count) : seat_obj.adult;
                const teenager = seat_obj.rate[i] == "teenager" ? parseInt(el.dataset.count) : seat_obj.teenager;
                const elder = seat_obj.rate[i] == "elder" ? parseInt(el.dataset.count) : seat_obj.elder;
                const total_count = adult + teenager + elder;
                if (total_count < seat_obj.selected_count) {
                    if(confirm("선택된 좌석이 예매 인원보다 많습니다. 선택하신 좌석을 모두 취소 하겠습니까?")) {
                        document.querySelectorAll('#seat_list .seat_selected').forEach(el => {
                            el.classList.remove('seat_selected');
                            el.classList.add('seat_able');
                            seat_obj.selected_count--;
                        })
                        get_selected_seats();
                        calculate_pay();
                    } else {
                        return;
                    }
                }
                if(el.classList.contains('group_counter')) {
                    const last_select = document.querySelector(`#${seat_obj.rate[i]}_group > ul > .group_selected`);
                    last_select.classList.add('group_counter');
                    last_select.classList.remove('group_selected');
                    seat_obj[seat_obj.rate[i]] = parseInt(el.dataset.count);
                    el.classList.remove('group_counter');
                    el.classList.add('group_selected');
                    count_management();
                    single_and_comple_checker();
                    calculate_pay();
                }
            })
        })
    }
}

function count_management() {
    const total_count = seat_obj.adult + seat_obj.elder + seat_obj.teenager;
    if (total_count > 0) {
        seat_blocker_ctrl(false);
    } else {
        seat_blocker_ctrl(true);
    }
    for (let i = 0; i < seat_obj.rate.length; i++) {
        const btn_list = document.querySelectorAll(`#${seat_obj.rate[i]}_group > ul > li`);
        document.querySelectorAll(`#${seat_obj.rate[i]}_group > ul > .group_disabled`).forEach(el => {
            el.classList.remove('group_disabled');
            el.classList.add('group_counter');
        })
        for (let j = btn_list.length - 1; j > 8 - total_count + seat_obj[seat_obj.rate[i]]; j--) {
            btn_list[j].classList.remove('group_counter');
            btn_list[j].classList.add('group_disabled');
        }
    }
    let str = "";
    str += seat_obj.adult > 0 ? `일반 ${seat_obj.adult}명` : "";
    str += seat_obj.adult > 0 && seat_obj.teenager > 0 ? ", " : "";
    str += seat_obj.teenager > 0 ? `청소년 ${seat_obj.teenager}명` : "";
    str += (seat_obj.adult > 0 && seat_obj.elder > 0) || (seat_obj.teenager > 0 && seat_obj.elder > 0) ? ", " : "";
    str += seat_obj.elder > 0 ? `경로 ${seat_obj.elder}명` : "";
    document.querySelector('.info.theater > .number > .data').innerText = str;
    document.getElementById('adults').value = seat_obj.adult;
    document.getElementById('teens').value = seat_obj.teenager;
    document.getElementById('elders').value = seat_obj.elder;
}

function get_selected_seats() {
    const selected_seats = document.querySelectorAll('#seat_list .seat_selected');
    let str_input = "";
    let str_info = "";
    selected_seats.forEach((el, i) => {
        if (i > 0) {
            str_input += " "
            str_info += ", "
        }
        str_input += el.dataset.sid
        str_info += el.dataset.sid.substring(0, 1) + parseInt(el.dataset.sid.substring(el.dataset.sid.indexOf("-") + 1));
    })
    document.getElementById('select_seats').value = str_input;
    document.querySelector('.info.seat > .seat_no > .data').innerText = str_info;
}

function calculate_pay() {
    let price = 12000 * seat_obj.selected_count;
    let adults = seat_obj.selected_count > seat_obj.adult ? seat_obj.adult : seat_obj.selected_count;
    let teenagers = seat_obj.adult > seat_obj.selected_count ? 0 : seat_obj.selected_count > (seat_obj.adult + seat_obj.teenager) ? seat_obj.teenager : seat_obj.selected_count - adults;
    let elders = seat_obj.selected_count > (seat_obj.adult + seat_obj.teenager) ? seat_obj.selected_count - adults - teenagers: 0;
    price = price - (teenagers * 4000) - (elders * 6000);
    const humans = [adults, teenagers, elders];
    for (let i = 0; i < seat_obj.rate.length; i++) {
        if (humans[i] > 0) {
            document.querySelector(`.pnt.payment-${seat_obj.rate[i]}`).classList.remove('d-none');
            document.querySelector(`.pnt.payment-${seat_obj.rate[i]} .quantity`).innerText = humans[i];
        } else {
            document.querySelector(`.pnt.payment-${seat_obj.rate[i]}`).classList.add('d-none');
            document.querySelector(`.pnt.payment-${seat_obj.rate[i]} .quantity`).innerText = 0;
        }
    }
    if (seat_obj.selected_count > 0) {
        document.querySelector('.payment-final').classList.remove('d-none');
        document.querySelector('.payment-final .price').innerText = price;
    } else {
        document.querySelector('.payment-final').classList.add('d-none');
        document.querySelector('.payment-final .price').innerText = 0;
    }
    document.getElementById('pay').value = price;
}

function single_and_comple_checker() {
    const total_count = seat_obj.adult + seat_obj.elder + seat_obj.teenager;
    if (total_count - seat_obj.selected_count == 1) {
        valid_seat_to_disabled();
    } else {
        valid_seat_to_able();
    }
    if (total_count == seat_obj.selected_count && seat_obj.selected_count > 0) {
        document.querySelector('.tnb_step_btn_right_before > .btn-right').classList.remove('step1');
        document.querySelector('.tnb_step_btn_right_before > .btn-right').classList.add('step2');
    } else {
        document.querySelector('.tnb_step_btn_right_before > .btn-right').classList.remove('step2');
        document.querySelector('.tnb_step_btn_right_before > .btn-right').classList.add('step1');
    }
}

function valid_seat_to_disabled() {
    const vaild_seats = document.querySelectorAll('#seat_list .seat_able[data-valid="1"]');
    vaild_seats.forEach(el => {
        const target_row = el.dataset.sid.substring(0, el.dataset.sid.indexOf("-"));
        const target_col = parseInt(el.dataset.sid.substring(el.dataset.sid.indexOf("-")+1));
        if (document.querySelector(`#seat_list .seat_selected[data-sid="${target_row}-${lpad(target_col - 1,2,"0")}"]`) == null &&
            document.querySelector(`#seat_list .seat_selected[data-sid="${target_row}-${lpad(target_col + 1,2,"0")}"]`) == null) {
                el.classList.remove('seat_able');
                el.classList.add('seat_blocked');
                el.innerHTML = '<i class="bi bi-x"></i>';
            }
    });
}

function valid_seat_to_able() {
    const vaild_seats = document.querySelectorAll('#seat_list .seat_blocked[data-valid="1"]');
    vaild_seats.forEach(el => {
        el.classList.remove('seat_blocked');
        el.classList.add('seat_able');
        el.innerHTML = `${parseInt(el.dataset.sid.substring(el.dataset.sid.indexOf("-")+1))}`;
    })
}

function remove_hovers() {
    document.querySelectorAll('.seat_hovered').forEach((el) => {
        el.classList.remove('seat_hovered');
    })
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

// 좌석 선택 방지 및 삭제 true: 선택 불가, false: 선택 가능
function seat_blocker_ctrl(flag = true) {
    if (flag) {
        document.getElementById('seat_blocker').classList.remove('d-none');
    } else {
        document.getElementById('seat_blocker').classList.add('d-none');
    }
}

async function seat_list_writer() {
    const seat_list_zone = document.getElementById('seat_list');
    const width = seat_obj.room_info.width;
    const height = seat_obj.room_info.height;
    let row = 64;
    let col = 0;
    let idx = 0;
    let start = 0;
    const path_x = [];
    const path_y = [];
    if (seat_obj.room_info.pathX1 > 0) {
        path_x.push(seat_obj.room_info.pathX1);
        if (seat_obj.room_info.pathX2 > 0) {
            path_x.push(seat_obj.room_info.pathX2);
        }
    }
    if (seat_obj.room_info.pathY1 > 0) {
        path_y.push(seat_obj.room_info.pathY1);
        if (seat_obj.room_info.pathY2 > 0) {
            path_x.push(seat_obj.room_info.pathY2);
        }
    }
    let str = ""
    for(let y = 0; y < height; y++) {
        // y 분기: path_y가 있는지 
        str += '<div class="d-flex">';
        if (!path_y.includes(y)) {
            row++;
            str += `<div class="seat_row">${String.fromCharCode(row)}</div>`;
        } else {
            str += `<div class="seat"></div>`;
        }
        for(let x = 0; x < width; x++) {
            // x 분기1 : path_x가 있는지
            if (!path_x.includes(x)) {
                col++;
                if (start < 1) {
                    start = col;
                }
                // x 분기2 : 해당 좌석이 존재하는지
                if (seat_obj.seat_list[idx].sid == String.fromCharCode(row) + "-" + lpad(col, 2, "0")) {
                    str += `<div class="seat ${seat_obj.seat_list[idx].status ? "seat_disabled" : "seat_able"}" `;
                    str += `data-sid="${seat_obj.seat_list[idx].sid}" data-valid="${seat_obj.seat_list[idx].valid ? "1" : "0"}" `;
                    str += `data-start="${start}" data-price=${seat_obj.seat_list[idx].price}`;
                    str += `>${col}</div>`;
                    if (seat_obj.seat_list[idx].status) {
                        start = 0;
                    }
                    idx++;
                } else {
                    start = 0;
                    str+=`<div class="seat"></div>`;
                }
            } else {
                start = 0;
                str+=`<div class="seat"></div>`;
            }
        }
        start = 0;
        col = 0;
        str += '</div>';
    }
    seat_list_zone.innerHTML = str;
}

function age_valid_check() {
    if (seat_obj.movie_info.rate != "ALL") {
        const now = new Date();
        const birth = new Date(get_birth);
        const gap = now.getFullYear() - birth.getFullYear();
        if (gap < parseInt(seat_obj.movie_info.rate)) {
            alert("고객님은 관람하실 수 없는 등급의 영화입니다.");
            location.replace("/book/");
        }
    }

}

function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += "";
    padStr += "";
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}
