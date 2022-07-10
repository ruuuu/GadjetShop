import { API_URI } from "./var";


const createCardImageSlider = (largeImages) => { // largeImages = ['img/71114058551-s.jpg', 'img/1114058591-s.jpg'] - массив картинок

    const ul = document.createElement('ul');
    ul.className = 'swiper-wrapper';

    const cardImagesSlides = largeImages.map((url) => { // метод map перебирает массив и возвщадает новый массив cardImagesSlides=[li.swiper-slide, li.swiper-slide, li.swiper-slide], он применяет перданную функцию к каждому элементу массива
        const li = document.createElement('li');
        li.className = 'swiper-slide';

        const img = new Image(); // <img>, а можно было создать чрез createElement('img')
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



const createCardImageThumbSlider = (smallImages) => {
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


    ul.append(...cardImagesSlides); // всатвляем сразу мноджество <li></li>, ...-спреад отператор, чтобы вытащить поэлементно из массива 

    return ul; // <ul><li>...</li></ul>

};



export const renderItem = (item) => { // item-{} товар полученный от сервера
    console.log('item from server', item);

    const cardImage = document.querySelector('.card__image'); // img
    cardImage.append(createCardImageSlider(item.images.large)); // передаем фунцию, котрпая возвращате массив 

    const cardSliderThumb = document.querySelector('.card__slider-thumb'); //  ul
    cardSliderThumb.append(createCardImageThumbSlider(item.images.small)); // передаем масив картинок от сервера



};

