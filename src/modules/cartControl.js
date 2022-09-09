import { API_URI } from "./var.js";
import { seviceCounter } from "./counterControl.js";

// добавление товара {} в лок хранлище(корзину)
const addToCart = (id, count = 1) => {      // id - id товара, count- число товара(с id) в корзине. Если count не передали то предадим 1

    //корзина  cartGoods = { 
    //      1103753567: 1, 
    //      2495679461: 3, 
    //      id3: count
    //   } - объект
    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {};       // получаем из locastorage днные по ключу cart-ts(его придумали сами), данные в  нем хранятся в виде JSON, поэтому парсим JSON.parse
    cartGoods[id] = count;      // добавляепм товар с  id в объект cartGoods(корзина)

    localStorage.setItem('cart-ts', JSON.stringify(cartGoods));         // запсиывем в лок ханилище обнолвенные данные, сперва превращаем в json-строку методом JSON.stringify 
};




// удалеение товара из лок хранлища, при нажатии на крестик у товара(на cart.hrml), будем вызыват эту фукницю
const removeToCart = (id) => {      // id - id товара


    //  cartGoods = {id: count} - объект
    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // получаем из locastorage днные по ключу cart-ts, данные в  нем хранятся в виде JSON, поэтому парсим JSON.parse

    delete cartGoods[id];       // удаляем элемент из объекта

    localStorage.setItem('cart-ts', JSON.stringify(cartGoods));         // запсиывем в лок ханилище обноленные  данные, сперва превращаем в json методом JSON.stringify 
};


//                              classCount - число на корзне в правом верхнем углу
// присвамеваем {}, если мы ничего не передаем в метод
const checkItems = ({ classDelete, classAdd, classCount } = {}) => {        // проверяет число товаров в корзине и вставляем число торвоав зеленом кружочке

    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // получим даннеы из  localStorage, товароы в  корзине
    //console.log('Корзина cartGoods ', cartGoods);
    //корзина  cartGoods = { 
    //      1103753567: 3, 
    //      2495679461: 1, 
    //      id3: 2
    //   } - объект
    let count = 0;      // число товаров в Корзине

    for (const key in cartGoods) {      //  перебираем свойства в объекте(в Корзине). Объект перебираем  циклом for in 
        //console.log('key ', key);
        count += cartGoods[key];
    }

    const cartElem = document.querySelector('.header__cart');       // зеленый кружочек(в правом верхнем углу) на Корзине
    cartElem.dataset.count = count;         // записываем значение в дата-атрбиут data-count;  elem.dataset.название_дата_атрибута(без_data)

    if (classDelete) {      // для кнопки "В корзине"
        const elems = document.querySelectorAll('[data-id-goods]');         // ищем по АТРИБУТУ data-id-goods, полуим псевдомассив кнопок В корзину [ button.goods-item__to-cart, button.goods-item__to-cart, button.goods-item__to-cart]

        elems.forEach((elem) => {       // перебираем кнопки "В корзину" button.goods-item__to-cart
            if (cartGoods[elem.dataset.idGoods]) {      // если есть товар в корзине cartGoods
                elem.classList.add(classDelete);        // <button class="goods-item__to-cart goods-item__to-cart--remove" ></buttonclass=goods-item__to-cart></button>
                elem.textContent = 'В корзине';
            }
            else {
                elem.classList.remove(classDelete);
                elem.textContent = 'В корзину';
            }
        });
    }

    if (classAdd && classCount) {
        const countElem = document.querySelector(`${classCount}`);      // зеленый кружочек на корзине(правый верхний угл)
        const addElem = document.querySelector(`${classAdd}`);          // кнопка В Корзину
        countElem.value = cartGoods[addElem.dataset.idGoods] || 1;      //  лейбл между кнопками +/-
    }

};



// Логика на;атия +/- у товара:
//                            wrapper - .goods-list. приравниваемк  объекту птсой объект,вслучае если передаваемых парамтеров не будет
export const cartControl = ({ wrapper, classAdd, classDelete, classCount } = {}) => {       // деструктурируем объект, classAdd - класс у кнопки "В корзину"(определяем по кнпоке ли был клик),  classDelete класс на кнопке "В корзине"
    checkItems({ classDelete, classAdd, classCount });      // всем кнопкам добавляем класс classDelete

    if (wrapper && classAdd && classDelete) {       // был ли передан wrapper(тк необязательный параметр, потому что на странице card.html wrapper нет)

        wrapper.addEventListener('click', (evt) => {        // evt - объект события click; wrapper - чтоыб не навешивать собвие на каждую кнпоку "В корзину", навешаем на их родителя (это делегирование)
            const target = evt.target;      // элемент на котрый нажали

            const id = target.dataset.idGoods;      // забираем значение дата-атрибута data-id-goods у нажатого элемента(кнопки)

            if (!id) {      // если нажали не на кнопку
                return;         // ничего не делаем
            }

            if (target.closest(`.${classDelete}`)) {        // если нажали на кнпоку "В корзине".  Метод elem.closest('selector') проверяет наличие селектора у элемента/его родителей elem 
                removeToCart(id);
            }
            else if (target.closest(`.${classAdd}`)) {      // если нажали  на кнопку "В корзину"
                //console.log('нажали на кноку В Корзину');
                addToCart(id);
            }

            checkItems({ classDelete });        // проверяет число товаров в корзине и указваем число торвоав в зеленом кружочке
        });
    }
    else
        if (classAdd && classCount) {
            const btn = document.querySelector(`${classAdd}`);         // кнопка "В корзину" на странице товара
            const id = btn.dataset.idGoods;         // забираем значение дата-атрибта
            const countElem = document.querySelector(`${classCount}`); // лейбл между кнопками +/-

            btn.addEventListener('click', () => {
                const count = +countElem.value;     // + приводит к строке
                addToCart(id, count);       // добавление товара в лок хранлище(корзину)
                checkItems();        // проверяет число товаров в корзине и указваем число торвоав в зеленом кружочке
            });
        }

};



// отрисовываем товары из Корзины cartGoods на старнице cart.html, мой способ:
export const renderCart = (goods, cartGoods) => {       // goods - товары [{},{},{},{}] Корзины  с сервера; cartGoods {'343534534':1, '67864564':3, '554535432': 2}
    //console.log('goods from trash ', goods);
    const cartGoodsList = document.querySelector('.cart-goods__list');      // ul
    cartGoodsList.textContent = '';                 // при  последущем отрисовывании чоб спрва очистилось все 

    const cartItems = goods.map((good) => {         //   вернет массив li-ек
        const li = document.createElement('li');
        li.classList.add('cart-goods__item', 'item');
        li.innerHTML = `
            <img class="item__img" src="${API_URI}${good.images.present}" alt="${good.title}">
            <div class="item__detail">
                <h4 class="item__title">${good.title}</h4>
                <p class="item__vendor-code">Артикул: ${good.id}</p>
            </div>

            <div class="item__control">
                <div class="item__count">
                    <button class="item__btn item__btn--dec">–</button>
                    <output class="item__number">${cartGoods[good.id]}</output>
                    <button class="item__btn item__btn--inc">+</button>
                </div>
                <p class="item__price">${good.price} ₽ </p>
                <button class="item__remove-cart">
                    <svg>
                        <use href="#remove" />
                    </svg>
                </button>
            `;

        li.querySelector('.item__count').dataset.idGoods = good.id;
        return li; // <li>...</li>

    });

    // cartItems = [li.cart-goods__item, li.cart-goods__item, li.cart-goods__item]
    // ...cartItems = <li class="cart-goods__item"></li>  <li class="cart-goods__item"></li>  <li class="cart-goods__item"></li>

    cartGoodsList.append(...cartItems);

};




// отрисовываем товары из Корзины cartGoods на старнице cart.html(втрой способ Максима):
export const renderCart2 = (goods, cartGoods) => {       // goods - товары [{},{},{},{}] Корзины  с сервера; cartGoods {'343534534':1, '67864564':3, '554535432': 2}

    const cartGoodsList = document.querySelector('.cart-goods__list');      // ul
    cartGoodsList.textContent = '';             // при  последущем отрисовывании чоб спрва очистилось все 

    goods.forEach((item) => {                   //  перебираем товары goods с сервера  (из Корзина)

        const li = document.createElement('li');
        li.classList.add('cart-goods__item', 'item');

        const img = new Image(200, 200); // задаем размеры 
        img.classList.add('item__img');
        img.src = `${API_URI}${item.images.present}`;
        img.alt = item.title;

        const detail = document.createElement('div');
        detail.classList.add('item__detail');

        const title = document.createElement('h4');
        title.className = 'item__title';
        title.textContent = item.title;

        const vendor = document.createElement('p');
        vendor.className = 'item__vendor-code';
        vendor.textContent = `Артикул ${item.id}`;
        detail.append(title, vendor);


        const control = document.createElement('div');
        control.className = 'item__control';

        const count = document.createElement('div');
        count.className = 'item__count';
        count.dataset.idGoods = item.id;                    // добавляем дата-атрибут data-id-goods, чтобы отправлять selectorWrapper в метод seviceCounter(). Либо вместо дата-атрибута можно просто добавить id

        const dec = document.createElement('button');
        dec.className = 'item__btn item__btn--dec';
        dec.textContent = '-';


        const number = document.createElement('output');
        number.className = 'item__number';
        number.value = cartGoods[item.id];


        const inc = document.createElement('button');
        inc.className = 'item__btn item__btn--inc';
        inc.textContent = '+';

        count.append(dec, number, inc);

        const price = document.createElement('div');
        price.className = 'item__price';
        price.textContent = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0,
        }).format(item.price);


        const remove = document.createElement('button');
        remove.className = 'item__remove-cart';
        remove.innerHTML = `
        <svg>
            <use href="#remove" />
        </svg>
        `;


        control.append(count, price, remove);
        li.append(img, detail, control);


        cartGoodsList.append(li);

        //                    `[data-id-goods="${item.id}"]`
        seviceCounter({ wrapper: count, number: number, selectDec: '.item__btn--dec', selectInc: '.item__btn--inc', });

        count.addEventListener('click', (evt) => {                          // вметсо тго чтобы навешивать обработчик события на каждуюю кнопку(+/-), вешаем его на их родителя -count, это назвается  делегирование
            const target = evt.target;                                      // элемент на  котрый нажали

            if (target.closest('.item__btn--dec, .item__btn--inc')) {            // Метод elem.closest('selector') проверяет наличие селектора у элемента elem/его родителей 
                addToCart(item.id, +number.value);                               // дбавлеам товар с его id в лок хранидище
                checkItems();                                                    // обновлям  число товаров в Корзине(зеленый кружлчек)
            }
        });


        remove.addEventListener('click', () => {        // нажатие на кнпоку Крестик у текущего товара
            removeToCart(item.id);                      //  удалеение товара из лок хранлища
            li.remove();                                // удфляем элемент из верстки
            checkItems();
        });
    });

}