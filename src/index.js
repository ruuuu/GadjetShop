import './index.html';
import './card.html';
import './cart.html';
import './index.scss';

import Swiper, { Thumbs, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar'; // scrollbar-горизонтальная лииния
import { pagination } from './modules/pagination.js';

const paginataionWrapper = document.querySelector('.pagination'); // оберка  блока пагинации

const pageURL = new URL(location); // location.href;  урл  страницы
//console.log('pageURL ', pageURL);

// "+" превращает из строки в число
const page = +pageURL.searchParams.get('page') || 1; // номер текущей страницы, получим значнеие параметра page, если не получим то 1
let isMobile = false; //  не моб версия




const startPagination = () => {
    if (window.innerWidth < 560) { // windows- наш бразуер, innerWidth его ширина
        pagination(paginataionWrapper, 20, page, 4);
        isMobile = true;
    }
    else {
        pagination(paginataionWrapper, 20, page, 6); //  вызов фукнции, передаем число страниц(20), page=номер текущй страницы, сколкь мах станиц отображать(6) и обертку станицы(элементс .pagination)
        isMobile = false;
    }
};



try {
    startPagination();

    window.addEventListener('resize', () => { // событе resize - изменение размера окна бразера 
        if (window.innerWidth <= 560 && !isMobile) { // windows- наш бразуер, innerWidth его ширина
            pagination(paginataionWrapper, 20, page, 4);
            isMobile = true;
        }
        if (window.innerWidth > 560 && isMobile) {
            pagination(paginataionWrapper, 20, page, 6); //  вызов фукнции, передаем число страниц(20), page=номер текущй страницы, сколкь мах станиц отображать(6) и обертку станицы(элементс .pagination)
            isMobile = false;
        }
    });

} catch (error) {
    console.warn(error);
    console.warn('Это не главная страница');
}








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