// const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";
const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const msg=document.querySelector(".msg");
// countryList is a list present in codes.js

// for(code in countryList){
//     console.log(code);
// }
for(let select of dropdowns){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        select.append(newoption);

        if(select.name=="from"&&code=="USD"){
            newoption.selected="selected";
        }
        else if(select.name=="to"&&code=="INR"){
            newoption.selected="selected";
        }
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}


const updateflag=(element)=>{
  let currcode=element.value;
  let countrycode=countryList[currcode];

  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newsrc;
};

window.addEventListener("load",()=>{
    mainfunc();
})
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
   mainfunc();
})

const mainfunc=async()=>{
    let amount=document.querySelector(".amount input");
    let amountval=amount.value;
    if(amountval===""||amountval<1){
        amountval=1;
        amount.value="1";
    }
  
    const URL=`${base_url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate=data[to.value.toLowerCase()];
    let final=amountval*rate;
    msg.innerText=`${amountval} ${from.value} = ${final} ${to.value}`;   
};