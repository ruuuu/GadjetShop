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

}
);

new Swiper('.card__image',
    {
        spaceBetween: 10, // расстояние между слайдами
        slidesPerView: 1,// сколько слайдев отображать на станице
        thumbs: {
            swiper: thumbSwiper,
            slideThumbActiveClass: 'card__thumb-btn--active',
        },
        modules: [Thumbs]
        // Optional parameters
        // direction: 'vertical',
        // loop: true,

        // // If we need pagination
        // pagination: {
        //     el: '.swiper-pagination',
        // },

        // // Navigation arrows
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },

        // // And if we need scrollbar
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    }
);






new Swiper('.recommended__carousel', {
    spaceBetween: 30, // расстояние между слайдами
    slidesPerView: 5,

    //     // Optional parameters
    //     direction: 'vertical',
    //     loop: true,

    //     // If we need pagination
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },

    //     // Navigation arrows
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },

    //     // And if we need scrollbar
    //     scrollbar: {
    //         el: '.swiper-scrollbar',
    //     },
}
);














// import code from './img/code.png'
// import { mult, sum } from './modules/calc';

// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);

// console.log(mult(3, 4));
// console.log(sum(3, 4));