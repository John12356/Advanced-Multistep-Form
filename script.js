const nextBtn=document.getElementById("next-step");
const fnum=document.getElementsByClassName("form-number");
const goBackBtn=document.getElementById("go-back");
const flip=document.getElementById("fp");
const switchbtn=document.getElementById("switch-btn");
const plans=document.getElementsByClassName("plan");
const planduration=document.getElementsByClassName("plan-duration");
const checkBox=document.getElementsByClassName("check-box");
const addOn=document.getElementsByClassName("add-on");
const form1val=document.getElementsByClassName("full-input");
const error=document.getElementsByClassName("warnings");
const special=document.getElementsByClassName("special");
const war2=document.getElementsByClassName("war2");
const step3period=document.getElementsByClassName("step3period");
const allItemssub=document.getElementsByClassName("all-sub-items");
const addOnTitle=document.getElementsByClassName("addon-title");
const totalCost=document.getElementsByClassName("total-cost");
const mode=document.getElementsByClassName("mode");
const scheme=document.getElementsByClassName("scheme");
const mainCost=document.getElementsByClassName("main-cost");
const change=document.getElementsByClassName("total-sub");
const onlynum=/\d+/g;
var slidevalue=0;
var total=0;
var periodDuration="Monthly";
function nextForm(){
    switch(slidevalue){
        case 0: checkValidation1();break;
        case -600: checkValidation2();break;
        case -1200:checkValidation3();break;
        case -1800:thankyou();break;
    }
}
function checkValidation1(){
    let ck=false;
    for(let i=0;i<form1val.length;i++){
        if(form1val[i].value==''){
            form1val[i].style="border-color: red;";
            error[i].innerText="This field can't be empty";
            ck=true;
        }
        else{
            form1val[i].style="";
            error[i].innerText="";
        }
    }
    if(ck){
        return;
    }else{
        changeslide();
    }
};
function goBack(){
    slidevalue+=1200;
    changeslide();
}
function changeslide(){
    slidevalue-=600;
    slide.style.transform=`translateX(${slidevalue}px)`;
    for(let i of fnum){
        i.style="";
        if(i.innerText==((slidevalue/-600)+1)){
            i.style="color: blue; background-color: hsl(206, 94%, 87%);";
        }
    }
    if(slidevalue==-1800){
        nextBtn.innerText="Confirm";
    }else{
        nextBtn.innerText="Next Step";
    }
    if(slidevalue==0){
        goBackBtn.style="visibility: hidden;";
    }else{
        goBackBtn.style="visibility: visible;";
    }
}
function thankyou(){
    flip.classList.add("isflipped");
}
for(let i of plans){
    i.addEventListener("click",()=>{
        if(i.style.backgroundColor==""){
            for(let j of plans) j.style="";
            i.style="background-color: hsl(243, 100%, 62%,5%);border-color:hsl(243, 100%, 62%);"
            mode[0].innerHTML=`${i.children[1].textContent}(<span class="scheme">${periodDuration}</span>)`;
            mainCost[0].innerHTML=`<span class="step3period">${i.children[2].children[0].textContent}</span>`;
        }
        else
            i.style="";
    });
}
switchbtn.addEventListener("change",()=>{
    if(switchbtn.checked){
        planduration[0].style="";
        planduration[1].style="color: hsl(213, 96%, 18%); opacity: 1;";
        for(let i of special){
            i.innerText="2 Months free";
        }
        allMonthToYear();
    }else{
        planduration[0].style="color: hsl(213, 96%, 18%); opacity: 1;";
        planduration[1].style="";
        for(let i of special){
            i.innerText="";
        }
        allYearToMonth();
    }
});
function allMonthToYear(){
    for(let i=0;i<step3period.length;i++){
        step3period[i].innerText=monthToYear(step3period[i].innerText);
    }
    periodDuration="Yearly";
    scheme[0].innerText=periodDuration;
}
function allYearToMonth(){
    for(let i=0;i<step3period.length;i++){
        step3period[i].innerText=yearToMonth(step3period[i].innerText);
    }
    periodDuration="Monthly";
    scheme[0].innerText=periodDuration;
}
for(let i=0 ;i<checkBox.length;i++){
    checkBox[i].addEventListener("change",()=>{
        if(checkBox[i].checked){
            addOn[i].style="background-color: hsl(243, 100%, 62%,5%);border-color:hsl(243, 100%, 62%);";
        }else{
            addOn[i].style="";
        }
    })
};

function checkValidation2(){
    let ck=true;
    for(let i of plans){
        if(i.style.backgroundColor!=""){
            ck=false;
        }
    }
    if(ck){
        war2[0].innerText="Select atleat one plan";
        return;
    }
    changeslide();
};

function monthToYear(text){
    let ytm=text.match(onlynum);
    let year=parseInt(ytm)*10;
    let ans=`$${year}/yr`;
    return ans;
}
function yearToMonth(text){
    let ytm=text.match(onlynum);
    let year=parseInt(ytm) /10;
    let ans=`$${year}/mo`;
    return ans;
}
function checkValidation3(){
    total=0;
    allItemssub[0].innerHTML="";
    for(let i=0;i<checkBox.length;i++){
        if(checkBox[i].checked){
            subIteamList(addOn[i]);
        }
    }
    var temp=mainCost[0].textContent;
    total+=parseInt(temp.match(onlynum));
    let d;
    if(periodDuration=="Yearly") d="yr";
    else d="mo";
    totalCost[0].innerHTML=`<span class="step3period">$${total}/${d}</span>`;
    changeslide();
}
function subIteamList(item){
    nums=item.children[2].textContent;
    nums=nums.match(onlynum);
    allItemssub[0].innerHTML+=
    `<div class="total-sub-items">
        <p class="sub-name">${item.children[1].children[0].textContent}</p>
        <p class="sub-cost"><span class="step3period">${item.children[2].textContent}</span></p>
    </div>`;
    total+=parseInt(nums);
}
change[0].addEventListener("click",()=>{
    if(switchbtn.checked){
        switchbtn.checked=false;
        allYearToMonth();
    }else{
        switchbtn.checked=true;
        allMonthToYear();
    }
})