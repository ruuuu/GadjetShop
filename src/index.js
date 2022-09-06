import './index.html';
import './card.html';
import './cart.html';
import './index.scss';
import Swiper, { Thumbs, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar'; // scrollbar-горизонтальная лииния
import { startPagination } from './modules/pagination.js';
import { getGoods, getGoodsItem } from './modules/goodService';
import { renderGoods, renderGoods2 } from './modules/renderGoods';
import { renderItem } from './modules/renderItem';
import { filter, filterFooter } from './modules/filter';
import { cartControl, renderCart } from './modules/cartControl';
import { seviceCounter } from './modules/counterControl';
import { getGoodsList } from './modules/goodService';




// отображение списка товаров(на index.html):
try {
    const goodsList = document.querySelector('.goods__list');       //  <ul class="goods__list"></ul>, cюда вставляем товары полученные от сервера

    if (goodsList) {
        const paginataionWrapper = document.querySelector('.pagination');       // обертка  блока пагинации
        filter(goodsList, paginataionWrapper);      // фильрация


        // лоадер добавялем в goodsList
        goodsList.innerHTML = `
        <div class="goods__preload"> 
            <svg width="256" height="256" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" fill="black"/>
            <path d="M20 12H22C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12Z" fill="black"/>
            </svg>
        </div>
        `;

        getGoods()      // получение спсика товаров от сервера
            .then(({ goods, pages, page }) => {         // деструктуризация, goods-товары от сервера

                //console.log('goods ', goods);
                renderGoods(goodsList, goods);      // отрисовываем карточки товаров в goodsList, полученные от сервера  goods = [{},{},{},{},{}]
                startPagination(paginataionWrapper, pages, page);       // 50- число страниц(котрые в блоке пагинации )

                // goods-item__to-cart класс кнопки "В корзину", goods-item__to-cart--remove класс кнопки "В корзине"
                cartControl({ wrapper: goodsList, classAdd: 'goods-item__to-cart', classDelete: 'goods-item__to-cart--remove' }); // передаем объект!
            })
    }
}
catch (error) {
    console.warn(error);
    console.warn('Это не главная страница');
}



// отображение карточки товара:
try {
    const card = document.querySelector('.card');
    if (card) {
        const pageURL = new URL(location);          // location.href;  урл  страницы
        const id = +pageURL.searchParams.get('id');         // из урла  получаем значение  парамтера id(id товара), searchParams.get(параметр) это втсроенный метод в JS

        // создаем лоадер
        const preload = document.createElement('div'); // <div></div>
        preload.className = 'card__preload';
        preload.innerHTML = `
            <svg width="256" height="256" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" fill="black"/>
                <path d="M20 12H22C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12Z" fill="black"/>
            </svg>
        `;

        card.append(preload);       //  вставляем preload в .card 


        getGoodsItem(id)        // получили товар по id от сервера:
            .then((item) => {
                //console.log(item);        // товар - {}
                renderItem(item);       // отрисовыаем item - товар {}
                preload.remove();       // удаляем лоадер

                cartControl({ classAdd: '.card__add-cart', classDelete: '.', classCount: '.card__number' }); // меням надпись у кнопки В корзину, передаем ОБЪЕКТ
                return item.category;
            })
            .then((category) => {       // item, полученный из предыдущего then()
                return getGoods({ category });      // получим  [{},{},{},{}] товаров по опр категории от сервера
            })
            .then((data) => {       // data - данные который получим из предыдущего then()
                //console.log('спсиок товаров от сервера по опр категории, data ', data); // [{},{},{},{}]
                const goodsRecommendedList = document.querySelector('.recommended__list'); //  <ul></ul> cюда вставляем товары полученные от сервера
                renderGoods2(goodsRecommendedList, data);
            })


        seviceCounter({
            selectorWrapper: '.card__count', selectorNumber: '.card__number', selectDec: '.card__btn--dec', selectInc: '.card__btn--inc',
        });     // чтобы при нажтии на =/- число товраов увличивалось на станице товара(card.html)
    }

}
catch (error) {
    console.warn(error);
    console.warn('Это не страница с товаром');
}


// для страницы Корзина:
try {

    const cart = document.querySelector('.cart');
    if (cart) {
        const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // из лок хранилища вытаскиаме корзину {8976809908:1, 2324242532: 3}
        const list = Object.keys(cartGoods);    // выведет ключи объекта cartGoods , [8976809908, 2324242532]

        if (list.length) {
            // создаем лоадер
            const preload = document.createElement('div'); // <div></div>
            preload.className = 'card__preload';
            preload.innerHTML = `
            <svg width="256" height="256" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" fill="black"/>
                <path d="M20 12H22C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12Z" fill="black"/>
            </svg>
           `;

            cart.append(preload); //  вставляем preload в .cart
            getGoodsList(list)          //  с сервера  получаем спсика товаров из Корзины по их id
                .then(goods => {        // goods - товары котрые получили от сервера
                    renderCart(goods, cartGoods);       //  отрисовываем верстку товаров полученнеыот сервера из Корзины cartGoods
                    cartControl();          //  меням 
                    preload.remove();       // удаляем прелоадер
                })
        }
    }
}
catch (error) {
    console.warn(error);
    console.warn('Это не страница с корзиной');
}

filterFooter(); // катгеории в подвале


new Swiper('.recommended__carousel', {
    spaceBetween: 30, // расстояние между слайдами
    slidesPerView: 5,
});














