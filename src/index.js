import './index.html';
import './card.html';
import './cart.html';
import './index.scss';

import Swiper, { Thumbs, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar'; // scrollbar-горизонтальная лииния


const thumbSwiper = new Swiper('.card__slider-thumb', {
    spaceBetween: 44, // расстояние между слайдами
    slidesPerView: 3,
    modules: [Scrollbar],
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true, // чтоы можно было перетаскивать
    },

});


new Swiper('.card__image', {
    spaceBetween: 10, // расстояние между слайдами
    slidesPerView: 1,// сколько слайдев отображать на станице
    thumbs: {
        swiper: thumbSwiper,
        slideThumbActiveClass: 'card__thumb-btn--active',
    },
    modules: [Thumbs]

});






new Swiper('.recommended__carousel', {
    spaceBetween: 30, // расстояние между слайдами
    slidesPerView: 5,
});














// import code from './img/code.png'
// import { mult, sum } from './modules/calc';

// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);

// console.log(mult(3, 4));
// console.log(sum(3, 4));