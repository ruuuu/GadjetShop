import { API_URI } from "./var";
import Swiper, { Thumbs, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar'; // scrollbar-горизонтальная лииния


const createCardImageSlider = (largeImages) => { // largeImages = ['img/71114058551-s.jpg', 'img/1114058591-s.jpg'] - массив картинок

    const ul = document.createElement('ul');
    ul.className = 'swiper-wrapper';

    const cardImagesSlides = largeImages.map((url) => { // метод map перебирает массив и возвщадает новый массив cardImagesSlides=[li.swiper-slide, li.swiper-slide, li.swiper-slide], он применяет перданную функцию к каждому элементу массива
        const li = document.createElement('li');
        li.className = 'swiper-slide';

        const img = new Image(); // <img>, а можно было создать чрез createElement('img'), если через объект то можно задвать/менять размеры у изображения
        img.src = `${API_URI}${url}`;
        console.log('картинка ', `${API_URI}${url}`);
        li.append(img);
        return li; // <li><img src=""></li>
    });

    ul.append(...cardImagesSlides); // всатвляем сразу мноджество <li></li>, ...-спреад отператор, чтобы вытащить поэлементно из массива 
    console.log('cardImagesSlides ', cardImagesSlides); // [li.swiper-slide, li.swiper-slide, li.swiper-slide]
    console.log(...cardImagesSlides); // <li><img></li>
    console.log(ul);
    return ul; // <ul><li></li></ul>
};



const createCardImageThumbSlider = (smallImages) => { // возвращает верстку элементов списка <li><button><img src=""></button></li>
    const ul = document.createElement('ul');
    ul.className = 'swiper-wrapper';


    const cardImagesSlides = smallImages.map((url) => { // метод map перебирает массив и возвщадает новый массив cardImagesSlides=[li.swiper-slide, li.swiper-slide, li.swiper-slide], он применяет перданную функцию к каждому элементу массива
        const li = document.createElement('li');
        li.className = 'swiper-slide';

        const button = document.createElement('button');
        button.className = 'card__thumb-btn';

        const img = new Image(); // <img>, а можно было создать чрез createElement('img')
        img.src = `${API_URI}${url}`;
        console.log('картинка ', `${API_URI}${url}`);
        button.append(img);
        li.append(button);
        return li; // <li><button><img src=""></button></li>
    });

    //console.log('массив cardImagesSlides ', cardImagesSlides); // [ li.swiper-slide, li.swiper-slide ]
    //console.log('...cardImagesSlides ', ...cardImagesSlides); // [ <li class="swiper-slide"><button></button></li> ]
    ul.append(...cardImagesSlides); // всатвляем спсиок [ <li></li>, <li></li>, <li></li> ] , ...-спреад отператор, чтобы вытащить поэлементно из массива cardImagesSlides

    return ul; // <ul><li>...</li></ul>
};




const createDescription = (descriptions) => { // передаем массив [<p></p>, <p></p>]
    const list = [];

    for (const description of descriptions) {
        const p = document.createElement('p');
        p.innerHTML = description;
        list.push(p);
    }


    console.log('list ', list); // [p, p, p]
    console.log('после спред оператора ', ...list); // [ <p>..</p>, <p>..</p>, <p>..</p>]
    return list;

};



const createParams = (params) => { // ОБЪЕКТ НЕЛЬЗЯ ПЕРЕБРАТЬ С ПОМОЩЬЮ map,  С ПОМОЩЬЮ for each. Можно перебрать с помощью for in
    const list = [];

    for (const key in params) {// перебираем объект params = {'':'', '':''} , key - ключ
        //console.log('ключи ', key);
        //console.log('значения ключей ', params[key]);

        const li = document.createElement('li');
        li.className = 'card__params-item';
        li.innerHTML = `
            <span>${key}</span>
            <span>${params[key]}</span>
        `;

        list.push(li);
    }
    //console.log('list ', list); // [ li.card__params-item, li.card__params-item,  li.card__params-item]
    //console.log('после спред оператора ', ...list); // [ <li class="card__params-item"></li>, <li class="card__params-item"></li>, <li></li>]
    return list;

};


// отображение карточик товара
export const renderItem = (item) => { // item-{} товар полученный от сервера
    console.log('item from server', item);

    const cardImage = document.querySelector('.card__image'); // img
    cardImage.append(createCardImageSlider(item.images.large)); // передаем фунцию, котрпая возвращате массив фоток для большого сладйера

    const cardSliderThumb = document.querySelector('.card__slider-thumb'); //  ul
    const swiperScrollBar = document.createElement('div'); // создаем элемент скроллбара
    swiperScrollBar.className = 'swiper-scrollbar';


    cardSliderThumb.append(createCardImageThumbSlider(item.images.small), swiperScrollBar); // передаем масив картинок от сервера для маленького сладйера

    const cardTitle = document.querySelector('.card__title');
    cardTitle.textContent = item.title;

    const cardVendorCode = document.querySelector('.card__vendor-code');
    cardVendorCode.textContent = `Артикул ${item.id}`;

    const cardPrice = document.querySelector('.card__price');
    cardPrice.textContent = new Intl.NumberFormat('ru-Ru', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    }).format(item.price); // этот конуткрор позволяет работь с  формататми дат временем, валютой

    const cardAddCart = document.querySelector('.card__add-cart');
    cardAddCart.dataset.idGoods = item.id; // добавили кнопке дата-атрибут data-id-goods, чтобы знать какой товар попал в Корзину


    const cardParamList = document.querySelector('.card__param-list'); // ul с характреитсиками
    const cardDescriptionText = document.querySelector('.card__description-text'); // блок Описание

    cardParamList.append(...createParams(item.characteristic)); // передаем функцию, котрпая возвращает [ <li class="card__params-item"></li>, <li class="card__params-item"></li>, <li></li>]


    cardDescriptionText.append(...createDescription(item.description));  // передаем функцию







    const thumbSwiper = new Swiper('.card__slider-thumb', { // маленький сладйер
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


};

