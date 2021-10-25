/* const { option } = require("grunt"); */

let nav = document.querySelector('.nav');
let btnmenu = document.querySelector('.menu__mobile');

btnmenu.onclick = function () {
    nav.classList.toggle('active');
    this.classList.toggle('cliked');
}
let lang = document.querySelector('.lang');
let langCurrent = document.querySelector('.lang .lang__current span');
let langOpt = document.querySelector('.lang .lang__option');
let langItems = document.querySelectorAll('.lang .lang__option a');
lang.addEventListener('click', function (e) {
    /* console.log('oo'); */
    e.stopPropagation();
    lang.classList.toggle('active');
});

langItems.forEach(function (item) {
    console.log(item);
    item.addEventListener('click', function () {
        /*  console.log(this.textContent); */
        let langText = this.textContent;
        let langCurrentSpan = langCurrent.textContent;
        langCurrent.innerHTML = langText;
        this.innerHTML = langCurrentSpan;
    })
});

document.addEventListener('click', function () {
    lang.classList.remove('active');
})

//add backgroud header to scroll
let header = document.querySelector('header');
let slider = document.querySelector('.slider');
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;
document.addEventListener('scroll', function () {
    let scrollY = window.pageYOffset;
    if (scrollY > (heightSlider - heightHeader)) {
        header.classList.add('activehd');
    }
    else {
        header.classList.remove('activehd');
    }
});





//back to top
let backtop = document.querySelector('.totop');
backtop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
    })
});

let positionProduct = document.querySelector('.products').offsetTop;
window.addEventListener('scroll', function () {
    let positionScroll = window.pageYOffset;
    if (positionScroll > positionProduct) {
        backtop.style.display = 'block';
    }
    else {
        backtop.style.display = 'none';
    }
});

//slider
let listitemslider = document.querySelectorAll('.slider__item');
let currentSlider = 0;
let number = document.querySelector('.slider__botton-paging .number');
let dot = document.querySelectorAll('.slider__botton-paging .dotted li');
listitemslider.forEach(function (itemSlider, index) {
    if (itemSlider.classList.contains('active')) {
        currentSlider = index;
    }
});

function shownumber(index) {
    number.innerHTML = (index).toString().padStart(2, '0');
}

shownumber(currentSlider + 1);
number.innerHTML = (currentSlider + 1).toString().padStart(2, '0');
//  console.log(dot);
dot[currentSlider].classList.add('active');

document.querySelector('.btnctr.next').addEventListener('click', function () {
    if (currentSlider < listitemslider.length - 1) {
        goto(currentSlider + 1);
        /*    listitemslider[currentSlider].classList.remove('active');
           listitemslider[currentSlider + 1].classList.add('active');
           currentSlider++; */
    }
    else {
        goto(0);
        /* listitemslider[currentSlider].classList.remove('active');
        listitemslider[0].classList.add('active');
        currentSlider=0; */
    }
});

document.querySelector('.btnctr.prev').addEventListener('click', function () {
    if (currentSlider > 0) {
        goto(currentSlider - 1);
        /* listitemslider[currentSlider].classList.remove('active');
        listitemslider[currentSlider - 1].classList.add('active');
        currentSlider--; */
    }
    else {
        goto(listitemslider.length - 1);
        /* listitemslider[currentSlider].classList.remove('active');
        listitemslider[listitemslider.length-1].classList.add('active');
        currentSlider=listitemslider.length-1; */
    }
});

function goto(index) {
    listitemslider[currentSlider].classList.remove('active');
    listitemslider[index].classList.add('active');
    dot[currentSlider].classList.remove('active');
    dot[index].classList.add('active');
    currentSlider = index;
    shownumber(currentSlider + 1);
}

dot.forEach(function (li, index) {
    li.addEventListener('click', function () {
        goto(index);
    })
});

//videos
let button_video = document.querySelectorAll('.play_button');
let popup_video = document.querySelector('.popup-video');
let close = document.querySelector('.popup-video .close');
let iframe = document.querySelector('.popup-video iframe');
button_video.forEach(function (button) {
    button.addEventListener('click', function () {
        let video_id = button.getAttribute('data-video-id');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + video_id);
        popup_video.style.display = 'flex';
    });
});

close.addEventListener('click', function () {
    iframe.setAttribute('src', '');
    popup_video.style.display = 'none';
});
document.querySelector('.popup-video').addEventListener('click', function (e) {
    iframe.setAttribute('src', '');
    popup_video.style.display = 'none';
});

//menu
let menu = document.querySelectorAll('header .menu a');
let heightHd = document.querySelector('header').offsetHeight;
let sections = [];
function removeActiveMenu() {
    menu.forEach(function (menu_element, menu_index) {
        menu_element.classList.remove('active');
    });
}

menu.forEach(function (element, index) {
    let classname = element.getAttribute('href').replace('#', '');
    let section = document.querySelector('.' + classname);
    sections.push(section);
    element.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: section.offsetTop - heightHd + 1,
            behavior: 'smooth',
        });
        removeActiveMenu();
        element.classList.add('active');
    });
});

window.addEventListener('scroll', function () {
    let positionPage = window.pageYOffset;
    sections.forEach(function (section, index) {

        if (positionPage > section.offsetTop - heightHd && positionPage < section.offsetTop + section.offsetHeight) {
            removeActiveMenu();
            menu[index].classList.add('active');
        }
        else {
            menu[index].classList.remove('active');
        }
    });
});