//input 값들 설정 및 box-shadow 적용
/*
    순서대로
    1. horizontal length
    2. vertical length
    3. blur radius
    4. spread radius
    5. outline / inset
*/

//기본 변수 선언
let inputRange = document.querySelectorAll('input[type=range]');
let inputNum = document.querySelectorAll('input[type=number]');
let backColor = document.getElementsByClassName('jscolor');
//box-shadow outline / inset 설정 변수
let shadowLine = document.querySelector('input[type=checkbox]');
shadowLine.value = "";
//box-shadow가 적용될 박스
const resultBox = document.getElementById('defaultBox');
//실제 코드 적용 버튼 및 span
const changeBtn = document.getElementById('changeBtn');
const codeResults = document.getElementsByClassName('codeResults');

/*--------------------------------------------------------------------------------------------*/

//공통 적용 box-shadow
function commonShadow(){
    let commonVal = ` ${inputRange[0].value + "px"}` 
        commonVal += ` ${inputRange[1].value + "px"}` 
        commonVal += ` ${inputRange[2].value + "px"}` 
        commonVal += ` ${inputRange[3].value + "px"}` 
        commonVal += ` ${"#" + backColor[0].value}` 
        commonVal += ` ${shadowLine.value + ";"}`;
    
    return commonVal;
}

Array.from(inputRange).forEach((elem, index) => {
    elem.oninput = (e) => {
        inputNum[index].value = e.target.value;
        settings();
    }
    inputNum[index].oninput = (e) => {
        elem.value = e.target.value;
        settings();
    }
    
});

//outline / inset 설정
shadowLine.onclick = (e) => {
    settings();
}

function settings(){

    //box-shadow 설정
    function setShadow(){
        shadowLine.value = shadowLine.checked ? 'inset' : '';

        resultBox.style.boxShadow = `
                ${inputRange[0].value + "px"}
                ${inputRange[1].value + "px"}
                ${inputRange[2].value + "px"}
                ${inputRange[3].value + "px"}
                ${shadowLine.value}
            `;
    }

    //width, height 설정 - 단순 편리성(코드 적용 x)
    function setSize(){
        resultBox.style.width = inputRange[4].value + "px";
        resultBox.style.height = inputRange[5].value + "px";
    }
    
    setShadow();
    setSize();
}

//박스 배경화면 설정
Array.from(backColor).forEach((elem, index) => {
    if(index == 0 || index == 2){
        checkBackColor(elem, resultBox, index);
    }
    else{
        let boxBack = document.getElementById('boxResult');
        checkBackColor(elem, boxBack, index);
    }
});

//색 변경 공통
function checkBackColor(elem, val, index){
    elem.onchange = (e) => {
        if(index != 0){
            val.style.backgroundColor = "#" + e.target.value;
        }else{
            val.style.color = "#" + e.target.value;
        }
    }
}

/*--------------------------------------------------------------------------------------------*/

changeBtn.onclick = () => {
    Array.from(codeResults).forEach((elem, index) => {
        elem.innerText = commonShadow();
    });
}