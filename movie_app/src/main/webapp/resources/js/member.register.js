async function idDupleCheckFromServer(idVal){
  try {
    const url = "/member/dupleCheck";
    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({id: idVal})
    }
    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;
  } catch (error) {
    console.log(error);
  }
}

document.getElementById('dupleCheck').addEventListener('click', (e) => {
  e.preventDefault();
  let idInputed = document.getElementById('id');
  let idVal = idInputed.value;

  if(idVal == ''){
    alert('가입할 아이디를 입력하세요!');
    idInputed.focus();
    return;
  } else {
    idDupleCheckFromServer(idVal).then(result => {
      console.log(typeof result, result);
      if(parseInt(result)){
        alert("이미 사용중인 아이디 입니다!");
        idInputed.value = "";
        idInputed.focus();
      }else{
        alert("사용 가능한 아이디 입니다!");
        document.getElementById("pwd").focus();
      }
    });
  }
});