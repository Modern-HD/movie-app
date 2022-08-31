let player;
let timer;
let elements;
const movieIdVal = document.getElementById('movieId').innerText;
const trailLink = document.getElementById('trailLink').innerText;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


document.getElementById("trailBtn").addEventListener('click', (e) => {
    document.getElementById("movieZone").innerHTML=`<iframe id="player" width="960" height="540" src="https://www.youtube.com/embed/${trailLink}?enablejsapi=1" frameborder="0"></iframe>`;
    document.getElementById("chatZone").innerText='';
    onYouTubeIframeAPIReady();
    getChatList();
    if (document.getElementById('sesNickName').innerText != '') {
        chatIdObj.value = document.getElementById('sesNickName').innerText;
    }
    setTimeout(document.getElementById("chat_modal").classList.remove("d-none"), 500);
})

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        timer = setInterval(updateChats, 100);
    }
    else {
        clearInterval(timer);
    }
}
function updateChats() {
    const currTime = parseInt(player.getCurrentTime() * 10) / 10.0;
    let prevChatChno;
    const chatZoneTag = document.getElementById("chatZone");
    let chatStr = '';
    for (const chat of chatArray) {
        // if (chat.playSec <= currTime) {
        //     const playSec = chat.playSec;
        //     let min = Math.floor(playSec / 60);
        //     let sec = Math.floor(playSec % 60);
        //     chatStr += `<span style="cursor:pointer" class="playSecond text-primary">${min}:${sec < 10 ? '0' + sec : sec}</span> <span class="text-secondary">${chat.writer}</span> ${chat.content} <br>`
        // }
        if (chat.playSec == currTime) {
            const playSec = chat.playSec;
            let min = Math.floor(playSec / 60);
            let sec = Math.floor(playSec % 60);
            chatZoneTag.innerHTML += `<span style="cursor:pointer" class="playSecond text-primary">${min}:${sec < 10 ? '0' + sec : sec}</span> <span class="text-secondary">${chat.writer}</span> <span class="text-light">${chat.content} </span><br>`
            goToBottom();
        }
        // chatZoneTag.innerHTML = chatStr;
        // goToBottom();
    }
    // if (currTime % 1 == 0) {
    //     let sec = currTime % 60
    //     let min = Math.floor(currTime / 60);
    //     document.getElementById("currTime").innerText = `${min}:${sec < 10 ? '0' + sec : sec}`;
    // }
}


async function chatDeleteFromServer(chnoVal) {
    try {
        const url = "/chat/" + chnoVal;
        config = {
            method: 'DELETE'
        }
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("playSecond")) {
        let timeArr = e.target.innerText.split(':');
        let realTime = parseInt(timeArr[0] * 60) + parseInt(timeArr[1]);
        player.seekTo(realTime);
    }
    else if (e.target.classList.contains("chatDelBtn")) {
        const chnoVal = e.target.dataset.chno;
        chatDeleteFromServer(chnoVal).then(result => {
            if (parseInt(result)) {
                alert('예고편 댓글 삭제 성공');
            }
            getChatList();
            spreadAllChats();
        });
    } else if(e.target.id == 'chat_modal') {
        player.stopVideo();
        document.getElementById("chat_modal").classList.add("d-none");
    }
})

async function postChatToServer(chatData) {
    try {
        const url = '/chat/post';
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(chatData)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}
const chatIdObj = document.getElementById('chatId');
const chatContentObj = document.getElementById("chatContent");
document.getElementById("chatSbmBtn").addEventListener('click', (e) => {
    if (chatContentObj.value == null || chatContentObj.value == '') {
        alert("내용을 입력해 주세요.");
        chatContentObj.focus();
        return false;
    } else if(chatIdObj.value == null || chatIdObj.value == '') {
        alert("닉네임을 입력해 주세요.");
        chatIdObj.focus();
    } else {
        let chatData = {
            writer: chatIdObj.value,
            content: chatContentObj.value,
            playSec: parseInt(player.getCurrentTime() * 10) / 10.0,
            movieId: movieIdVal
        }
        postChatToServer(chatData).then(result => {
            if (parseInt(result)) {
                alert('예고편 댓글 등록 성공~');
                chatContentObj.value = '';
                document.getElementById("currTime").innerText = '0:00';
            }
        });
        getChatList();
        player.playVideo();
    }
})

chatContentObj.addEventListener('focus', (e) => {
    let currTime = parseInt(player.getCurrentTime() * 10) / 10.0;
    let min = Math.floor(currTime / 60);
    let sec = Math.floor(currTime % 60);
    document.getElementById("currTime").innerText = `${min}:${sec < 10 ? '0' + sec : sec}`;
    player.pauseVideo();
})

chatIdObj.addEventListener('focus', (e) => {
    let currTime = parseInt(player.getCurrentTime() * 10) / 10.0;
    let min = Math.floor(currTime / 60);
    let sec = Math.floor(currTime % 60);
    document.getElementById("currTime").innerText = `${min}:${sec < 10 ? '0' + sec : sec}`;
    player.pauseVideo();
})

async function spreadChatFromServer(movieId) {
    try {
        const resp = await fetch('/chat/list/' + movieId);
        const chatList = await resp.json();
        return await chatList;
    } catch (error) {
        console.log(error);
    }
}
let chatArray;
function getChatList() {
    spreadChatFromServer(movieIdVal).then(result => {
        chatArray = result;
    })
}



function goToBottom() {
    let chatZoneTag = document.getElementById("chatZone");
    chatZoneTag.scrollTop = chatZoneTag.scrollHeight;
}

function spreadAllChats() {
    let allChatZoneTag = document.getElementById("allChatZone");
    if (allChatZoneTag.innerText == '' || allChatZoneTag.innerText == null) {
        document.getElementById("allChatBtn").innerHTML=`예고편 댓글 전체보기 <i class="bi bi-caret-up-fill text-warning"></i>`;
        for (const chat of chatArray) {
            const playSec = chat.playSec;
            let min = Math.floor(playSec / 60);
            let sec = Math.floor(playSec % 60);
            allChatZoneTag.innerHTML += `<span style="cursor:pointer" class="playSecond text-primary">${min}:${sec < 10 ? '0' + sec : sec}</span> <span class="text-secondary">${chat.writer}</span> <span class="text-light">${chat.content}</span> <span style="cursor:pointer" class="text-danger small chatDelBtn" data-chno="${chat.chno}">X</span><br>`
        }
    } else {
        document.getElementById("allChatBtn").innerHTML=`예고편 댓글 전체보기 <i class="bi bi-caret-down-fill text-warning"></i>`;
        allChatZoneTag.innerText = '';
    }
}
document.getElementById("allChatBtn").addEventListener('click', (e) => {
    spreadAllChats();
})