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

async function page_loading_func() {
    await get_info_data_from_server(get_scno).then(result => {
        info_obj.schedule_info = result.scvo;
        info_obj.movie_info = result.movo;
        info_obj.theater_info = result.tvo;
        info_obj.room_info = result.rvo;
    })
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(info_obj.schedule_info.startTime.substring(0, 10));
    let seats = get_seats;
    seats = seats.replace(/-0/g, "");
    seats = seats.replace(/-/g, "");
    seats = seats.replace(/ /g, ", ");
    document.getElementById('movie_name_zone').innerText = info_obj.movie_info.movieNm;
    document.getElementById('theater_name_zone').innerText = info_obj.theater_info.tname;
    document.getElementById('date_name_zone').innerText = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}(${week[date.getDay()]}) ${info_obj.schedule_info.startTime.substring(11, 16)} ~ ${info_obj.schedule_info.endTime.substring(11, 16)}`;
    document.getElementById('seat_name_zone').innerText = seats;
    loading_modal_ctrl(false);
}

document.addEventListener('DOMContentLoaded', () => {
    page_loading_func();
})

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