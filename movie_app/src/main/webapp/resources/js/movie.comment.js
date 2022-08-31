async function postCommentToServer(cmtData){
  try {
    const url = '/comment/post';
    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(cmtData)
    };
    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;  
  } catch (error) {
    console.log(error);
  }  
}

document.getElementById('cmtSbmBtn').addEventListener('click', (e) => {
  const cmtInputObj = document.getElementById('cmtText');
  if(document.getElementById('cmtWriter').innerText == ''){
    if(confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?')) {
      location.href = 'http://localhost:8090/member/login';
  }
   }else if(cmtInputObj.value == null || cmtInputObj.value == ''){
    alert('관람평을 작성해 주세요.');
    cmtInputObj.focus();
    return false;
  }else {
    let cmtData = {
      movieId : document.getElementById('movieId').innerText,
      writer : document.getElementById('cmtWriter').innerText,
      content : cmtInputObj.value,
      rate : document.getElementById('rateVal').innerText
    };
    console.log(cmtData);
    postCommentToServer(cmtData).then(result => {
      if(parseInt(result)) {
        alert('관람평이 등록되었습니다.');
        cmtInputObj.value = "";
        getCommentList(document.getElementById('movieId').innerText);
      }
    });
  }
});

async function spreadCommentFromServer(movieId, pageNo) {
  try {
      const resp = await fetch('/comment/'+movieId+"/"+pageNo); // RESTful
      const pagingHandler = await resp.json();
      return await pagingHandler; 
  } catch (error) {
    console.log(error);
  }
}

function getCommentList(movieId, pageNo=1){
  spreadCommentFromServer(movieId, pageNo).then(result => {
    document.getElementById('cmtCount').innerText = result.totalCount;

    document.querySelectorAll('.rateRatio')[0].innerText 
    = (parseInt(result.sumRate) / parseInt(result.totalCount)).toFixed(1);
    document.querySelectorAll('.rateRatio')[1].innerText 
    = (parseInt(result.sumRate) / parseInt(result.totalCount)).toFixed(1);
    console.log(result);

    const sesWriter = document.getElementById('cmtWriter').innerText;
    if (result.cmtList.length && pageNo == 1) {
      let tag = "";
      for (const cvo of result.cmtList) { 
          tag += `
          <li class="">
            <span class="img_info">
            <img src="
            ${cvo.rate > 8 ? "../../../resources/images/movie/movie_grade9~10.png" 
            : cvo.rate > 6 ? "../../../resources/images/movie/movie_grade7~8.png"
            : cvo.rate > 4 ? "../../../resources/images/movie/movie_grade5~6.png"
            : cvo.rate > 2 ? "../../../resources/images/movie/movie_grade3~4.png"
            : "../../../resources/images/movie/movie_grade0~2.png"}" alt=""></span>
            <div class="top_info">
              <span class="name">${cvo.writer}</span>
              <span class="txt_ic_score">
                <span class="stargradebg">
                  <span class="blindbg grade${cvo.rate}">
                    <span class="stargradecolor"></span>
                  </span>
                </span>
                <span class="gradenum">${cvo.rate}</span>
              </span>
              <span class="date_info">${cvo.modAt}</span>
            </div>
            <div class="review_info">${cvo.content}</div>
            <div class="btm_info">
              <div class="edit_review">
                ${cvo.writer == sesWriter ?
               `<em class="txt_cpn2 ty3" style="height:15px;">  관람평</em>
                <button class="btn_review_edit cmtMod" data-cno="${cvo.cno}">편집</button>
                <button class="btn_review_delete cmtDel" data-cno="${cvo.cno}">삭제</button>` : ""}
              </div>
            </div>
          </li>`;
      }
      document.getElementById('review_con_list1').innerHTML = tag;
    } else if(pageNo > 1){
      let tag = "";
      for (const cvo of result.cmtList) {
        tag += `
          <li class="">
            <span class="img_info">
            <img src="
            ${cvo.rate > 8 ? "../../../resources/images/movie/movie_grade9~10.png" 
            : cvo.rate > 6 ? "../../../resources/images/movie/movie_grade7~8.png"
            : cvo.rate > 4 ? "../../../resources/images/movie/movie_grade5~6.png"
            : cvo.rate > 2 ? "../../../resources/images/movie/movie_grade3~4.png"
            : "../../../resources/images/movie/movie_grade0~2.png"}" alt=""></span>
            <div class="top_info">
              <span class="name">${cvo.writer}</span>
              <span class="txt_ic_score">
                <span class="stargradebg">
                  <span class="blindbg grade${cvo.rate}">
                    <span class="stargradecolor"></span>
                  </span>
                </span>
                <span class="gradenum">${cvo.rate}</span>
              </span>
              <span class="date_info">${cvo.modAt}</span>
            </div>
            <div class="review_info">${cvo.content}</div>
            <div class="btm_info">
              <div class="edit_review">
                ${cvo.writer == sesWriter ?
               `<em class="txt_cpn2 ty3" style="height:15px;">MY관람평</em>
                <button class="btn_review_edit cmtMod" data-cno="${cvo.cno}">편집</button>
                <button class="btn_review_delete cmtDel" data-cno="${cvo.cno}">삭제</button>` : ""}
              </div>
            </div>
          </li>`;
      }
      document.getElementById('review_con_list1').innerHTML += tag;
    } else {
      // 리스트가 존재하지 않을 때 DOM
    }
    const moreBtn = document.getElementById('moreBtn');
    if(pageNo < parseInt(Math.ceil(result.totalCount / 10.0))) {
      moreBtn.style.visibility = 'visible';
    }else{
      moreBtn.style.visibility = 'hidden';
    }
  });
}
async function commentUpdateToServer(cmtData) {
  try {
    const url = "/comment/"+cmtData.cno;
    const config = {
      method: 'PUT', // PATCH도 가능
      headers: {
        'Content-Type':'application/json; charset=utf-8'
      },
      body: JSON.stringify(cmtData)
    };
    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;  
  } catch (error) {
    console.log(error);
  }
}
async function commentRemoveFromServer(cnoVal) {
  try {
    const url = "/comment/"+cnoVal;
    const config = {
      method: 'DELETE'
    };
    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('cmtMod')){
    const cnoVal = e.target.dataset.cno;   
    const li = e.target.closest('li');
    const contentVal = li.querySelector('div:nth-child(3)').innerText;
    const rateVal = li.querySelector('.gradenum').innerText;

    document.getElementById('txtCommentEdit').innerText = contentVal;
    document.getElementById('modRateVal').innerText = rateVal;
    document.querySelector(".modSbmBtn").dataset.cno = cnoVal;
    document.getElementById('modalBtn').click();
    const div2 = document.getElementById('star_rate2');
    on_star = div2.querySelectorAll(`button:nth-child(-n+${rateVal})`);
    on_star.forEach(el => {
      el.classList.add('on');
    });
    
    off_star = div2.querySelectorAll(`button:nth-child(n+${parseInt(rateVal)+1})`);
    off_star.forEach(el => {
      el.classList.remove('on');
    });
    console.log(off_star);
  }
  if(e.target.classList.contains('modSbmBtn')){
    const cmtModInput = document.querySelector('.cmtModifiedText'); 
    const cmtTextVal = cmtModInput.value;
    const modRateVal = document.getElementById('modRateVal').innerText;
    if(cmtTextVal == '') {
      alert('수정할 댓글 내용을 입력하세요!');
      cmtModInput.focus();
      return false;
    }else{
      const cmtData = {
        cno: e.target.dataset.cno,
        content: cmtTextVal,
        rate: modRateVal
      };
      commentUpdateToServer(cmtData).then(result => {
        if(parseInt(result)){
          document.querySelector('.btn-close').click();        
        }
        getCommentList(document.getElementById('movieId').innerText);
      });
    }
  }
  if (e.target.classList.contains('btnCloseLayer')) {
    document.querySelector('.btn-close').click();  
  }
  if(e.target.classList.contains('cmtDel')){
      if(confirm('삭제하신 관람평은 복구할 수 없습니다.\n정말 관람평을 삭제하시겠습니까?')) {
        const cnoVal = e.target.dataset.cno;
        commentRemoveFromServer(cnoVal).then(result => {
          if(parseInt(result)){
            getCommentList(document.getElementById('movieId').innerText);
          }
        });
    }
  }
  if(e.target.id == 'moreBtn'){
    e.preventDefault();
    const movieId = document.getElementById('movieId').innerText;
    const page = e.target.dataset.page;
    getCommentList(movieId, parseInt(page)+1);
    e.target.dataset.page++;
  }
});

const div2 = document.getElementById('star_rate2');
div2.addEventListener('mousemove', (e) => {
    if (e.target.classList.contains('star')) {
        let num = parseInt(e.target.innerText);

        on_star = div2.querySelectorAll(`button:nth-child(-n+${num})`);
        on_star.forEach(el => {
            el.classList.add('on');
        });

        off_star = div2.querySelectorAll(`button:nth-child(n+${num+1})`);
        off_star.forEach(el => {
            el.classList.remove('on');
        });

        document.getElementById('modRateVal').innerText
        = num;
    }    
})

