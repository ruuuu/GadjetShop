import { API_URI } from "./var";

// goods-[{},{},{}]  полученые от сервера:
export const renderGoods = (wrapper, goods) => { // wrapper -<ul class="goods__list"></ul>
    wrapper.textContent = ''; // очищает список товаров

    const cards = goods.map((item) => { // получим новый массив cards=[<li>...</li>, <li>...</li>,<li>...</li>,<li>...</li>], item-текущий товар {}, map применяет для каждого элеента массива переданную фукнцию
        console.log(item);

        const li = document.createElement('li');
        li.className = 'goods__item';
        li.innerHTML = `
            <article class="goods-item">
                <a class="goods-item__link" href="card.html?id=${item.id}">
                    <img class="goods-item__image" src="${API_URI}${item.images.present}" alt="${item.title} width="340" height="340>
                    <h3 class="goods-item__title">${item.title}</h3>
                </a>

                <div class="goods-item__buy">
                    <p class="goods-item__proce">${item.price} ₽</p>
                    <button class="goods-item__to-cart" data-id-goods="${item.id}">В корзину</button> 
                </div>
            </article>
        `;

        return li; // <li>...</li>
    });

    //  кнопке В корзину добавили атрибут data-id-goods чтобы записывать определенный  товар в корзину

    console.log('cards ', ...cards); // ... -spread отператор нужен чтобы вытащить каждый элемент массива

    wrapper.append(...cards); // добавили верстку <li></li> в <ul class="goods__list"></ul>

};



// goodss объект  { goods: Array(6), page: 1, pages: 1 } от сервера
export const renderGoods2 = (wrapper, goodss) => { // wrapper - <ul class="recommended__list"></ul>
    wrapper.textContent = '';
    console.log('goodss from server ', goodss); // получаем объект  { goods: Array(6), page: 1, pages: 1 }
    console.log('goodss.goods ', goodss.goods);

    const cards = goodss.goods.map((item) => { // перебираем массив товаров от сервера
        console.log('item2 ', item);

        const li = document.createElement('li');
        li.className = 'swiper-slide goods__item';
        li.innerHTML = `
            <article class="goods-item">
                <a class="goods-item__link" href="card.html?id=${item.id}">
                    <img class="goods-item__image" src="${API_URI}${item.images.present}" alt="${item.title} width="340" height="340>
                    <h3 class="goods-item__title">${item.title}</h3>
                </a>

                <div class="goods-item__buy">
                    <p class="goods-item__proce">${item.price} ₽</p>
                    <button class="goods-item__to-cart" data-id-goods="${item.id}">В корзину</button> 
                </div>
            </article>
        `;

        return li; // <li>...</li>
    });

    // итого: cards = [ li.swiper-slide.goods__item, li.swiper-slide.goods__item, li.swiper-slide.goods__item ]
    // кнопке В корзину добавили атрибут data-id-goods чтобы запсиывать определенный  товар в корзину
    console.log('cards ', cards);
    console.log('...cards ', ...cards); // ... -spread отператор нужен чтобы вытащить каждый элемент(товар) массива, после спреда оператора cards = [ <li>..</li>, <li>..</li>, <li>..</li>, <li>..</li>, <li>..</li> ]

    wrapper.append(...cards); // добавили версnку <li></li> в <ul class="recommended__list"></ul>

};


