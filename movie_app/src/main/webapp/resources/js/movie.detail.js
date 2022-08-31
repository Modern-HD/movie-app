

async function get_movie_date_from_server(movieId) {
  try {
      const resp = await fetch('/movieAPI/info/' + movieId); 
      const result = await resp.json();
      return result;
  } catch (error) {
      console.log(error);
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

window.onload=function() {
    const movieId = document.getElementById('movieId').innerText;
    let all_ticket = 0;
    console.log(movieId);

    get_movie_date_from_server(movieId).then(result => {
        console.log(result);
        const actor_list = document.getElementById('actor_list');
        const movie_info = result.movieInfoResult.movieInfo;
        let actor = "";
        for (let i = 0; i < (movie_info.actors.length > 5 ? 5 : movie_info.actors.length); i++) {
            actor += i > 0 ? ", " : "";
            actor += `${movie_info.actors[i].peopleNm}`;
        }
        actor += movie_info.actors.length > 5 ? " 등" : "";
        actor_list.innerHTML = actor;
        
        document.getElementById('directors').innerText 
        = movie_info.directors[0].peopleNm;

        let genres = "";
        for (let i = 0; i < movie_info.genres.length; i++) {
            genres += i > 0 ? ", " : "";
            genres += movie_info.genres[i].genreNm;
        }
        document.getElementById('genreNm').innerText = genres;

        document.getElementById('nations').innerText = movie_info.nations[0].nationNm;
    })

    get_movieList_from_server().then(result => {
        result.forEach(el => {
            all_ticket += parseInt(el.ticket);
        });
        console.log(result);
        result.forEach(el => {
            if (el.movieId == movieId) {
                document.getElementById('audiAcc').innerText = el.ticket;
                document.getElementById('ticketRatio').innerText
                = `${isNaN(parseInt(el.ticket) / parseInt(all_ticket) * 100) ? '0' : (parseInt(el.ticket) / parseInt(all_ticket) * 100).toFixed(1)}%`;
            }
        });
    })
};

const div = document.getElementById('star_rate');
div.addEventListener('mousemove', (e) => {
    if (e.target.classList.contains('star')) {
        let num = parseInt(e.target.innerText);

        on_star = div.querySelectorAll(`button:nth-child(-n+${num})`);
        on_star.forEach(el => {
            el.classList.add('on');
        });

        off_star = div.querySelectorAll(`button:nth-child(n+${num+1})`);
        off_star.forEach(el => {
            el.classList.remove('on');
        });

        document.getElementById('rateVal').innerText
        = num;
    }    
})

