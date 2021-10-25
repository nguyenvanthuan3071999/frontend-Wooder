$(document).ready(function () {
    //javascript => jquery
let btn=document.querySelector('.button');
let btn2=$('.button');

btn.addEventListener('click',function(){
    console.log(1);
});
btn2.on('click',function(){
    console.log(1);
});

});