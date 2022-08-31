let movie_list = [];
let all_ticket = 0;
    
async function get_box_office_from_server(date) {
    try {
        const resp = await fetch('/movieAPI/box/' + date); 
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

async function get_movieList_from_server() {
    try{
        const resp = await fetch('/movie/getmovielist');
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

// 박스 오피스 정렬
async function movie_list_sort_by_boxoffice() {
    movie_list.sort(function(a, b){return b.ticket - a.ticket})
    let date = new Date(+new Date() + (3240 * 10000) - (1000*60*60*24)).toISOString().split("T")[0];
    date = date.replace(/-/g, "");
    await get_box_office_from_server(date).then(result => {
        movie_list.forEach(el => {
            all_ticket += parseInt(el.ticket);
        });
        for (let i = 9; i >= 0; i--) {
            for(let j = 0; j < movie_list.length; j++) {
                if(result.boxOfficeResult.dailyBoxOfficeList[i].movieCd == movie_list[j].movieId) {
                    let temp = movie_list[j];
                    movie_list.splice(j, 1);
                    movie_list.unshift(temp);
                    break;
                }
            }
        }
        for (let i = 0; i < movie_list.length; i++) {
            document.getElementById('print_area').innerHTML +=
                `<li class="li-lee">
                    <div class="top_info">
                        <span class="poster_info"> 
                            <a class="a-lee" href="/movie/detail?movieId=${movie_list[i].movieId}&rank=${i + 1}">
                                <div class="info">
                                    <h3>상 세 정 보</h3>
                                </div>
                                <img class="img-" src="https://file.cineq.co.kr/i.aspx?movieid=${movie_list[i].movieId}&size=210">
                                <em class="num_info em-">${i + 1}</em>
                                <span class="ic_grade gr_${movie_list[i].rate }"></span>
                            </a>
                        </span>
                    </div>
                    <div class="btm_info">
                        <strong class="tit_info">${movie_list[i].movieNm}</strong>
                        <span class="sub_info1">
                            <span class="rate_info">예매율 <em class="em-">${isNaN(parseInt(movie_list[i].ticket) / parseInt(all_ticket) * 100) ? '0' : (parseInt(movie_list[i].ticket) / parseInt(all_ticket) * 100).toFixed(1)}%</em></span>
                        </span>
                    </div>
                </li>`;
            }
        });
}
window.onload=function() {
    get_movieList_from_server().then(result => {
        movie_list = result;
        movie_list_sort_by_boxoffice();
        console.log(movie_list);
    })
};