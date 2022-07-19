
// добавление товара в лок хранлище(корзину)
const addToCart = (id, count = 1) => { // id - id товара, count- число товара(с id) в корзине. Если count не передали то предадим 1

    //корзина  cartGoods = { 
    //      id1: count, 
    //      id2: count, 
    //      id3: count
    //   } - объект
    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // получаем из locastorage днные по ключу cart-ts, данные в  нем хранятся в виде JSON, поэтому парсим JSON.parse
    cartGoods[id] = count; // добавляепм товар с идентификаром id в объект cartGoods(корзина)

    localStorage.setItem('cart-ts', JSON.stringify(cartGoods)); // запсиывем в лок ханилище обнолвенные данные, сперва превращаем в json методом JSON.stringify 

};




// удалеение товара из лок хранлища, при нажатии на крестик(на cart.hrml), будем вызыват эту фукницю
const removeToCart = (id) => { // id - id товара

    //  cartGoods = {id: count} - объект
    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // получаем из locastorage днные по ключу cart-ts, данные в  нем хранятся в виде JSON, поэтому парсим JSON.parse

    delete cartGoods[id]; // удаляем элемент из объекта

    localStorage.setItem('cart-ts', JSON.stringify(cartGoods)); // запсиывем в лок ханилище обноленные  данные, сперва превращаем в json методом JSON.stringify 

};



const checkItems = (classDelete) => { // проверяет число товаров в корзине и указваем число торвоав в счетчике(псевдоэлемент-зеленый кружлчек на корзине)
    const elems = document.querySelectorAll('[data-id-goods]'); // ищем по АТРИБУТУ data-id-goods, полуим псевдомассив кнопко В корзигу
    //console.log('elems ', elems); // [ button.goods-item__to-cart, button.goods-item__to-cart, button.goods-item__to-cart]

    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // получим даннеы из  localStorage, товароы в  корзине
    console.log('Корзина cartGoods ', cartGoods);
    //корзина  cartGoods = { 
    //      id1: count, 
    //      id2: count, 
    //      id3: count
    //   } - объект
    let count = 0; // число товаров в Корзине

    for (const key in cartGoods) { //  перебираем свойства в объекте(в Корзине). Объект перебираем  циклом for in 
        console.log('key ', key);
        count += cartGoods[key];
    }

    const cartElem = document.querySelector('.header__cart'); // зеленый кружочек на Корзине
    cartElem.dataset.count = count; // записываем значение в дата-атрбиут data-count;  Elem.dataset.название_дата_атрибута(без_data)

    if (classDelete) {
        const elems = document.querySelectorAll('[data-id-goods]'); // ищем по АТРИБУТУ data-id-goods, полуим псевдомассив кнопок В корзину [ button.goods-item__to-cart, button.goods-item__to-cart, button.goods-item__to-cart]

        elems.forEach((elem) => { // перебираем кнопки button.goods-item__to-cart
            if (cartGoods[elem.dataset.idGoods]) { // если есть  товар с id=data-id-goods  в корзине cartGoods
                elem.classList.add(classDelete); // <button class="goods-item__to-cart goods-item__to-cart--remove" ></buttonclass=goods-item__to-cart></button>
                elem.textContent = 'В корзине';
            }
            else {
                elem.classList.remove(classDelete);
                elem.textContent = 'В корзину';
            }
        });
    }

};


//                            wrapper - .goods-list
export const cartControl = ({ wrapper, classAdd, classDelete }) => { // деструктурируем объект, classAdd - класс укнопки "В корзину"(определяем по кнпоке ли был клик),  classDelete класс на кнопке "Удалить из корзины"
    checkItems(classDelete); // всем кнопкам навешиваем класс classDelete

    if (wrapper) { // был ли передан wrapper(тк необязательный параметр, потому что на странице с товаром wrapper нет), wrapper - чтоыб не навешивать собвие на каждую кнпоку В корзину, навешаем на их родителя (это делегирование)

        wrapper.addEventListener('click', (evt) => { // evt - объект события click
            const target = evt.target; // элемент на котрый нажали

            const id = target.dataset.idGoods; // забираем дата-атрибут у нажатого элемента(кнопки), idGoods это атрибут data-id-goods


            if (!id) {
                return; // ничего не делаем
            }

            if (target.closest(`.${classDelete}`)) { // если нажали на "Удалить из корзины".  Метод elem.closest('selector') проверяет наличие селектора у элемента elem(причем проверяет наличие селектора и у его  родителей)
                removeToCart(id);
            }
            else if (target.closest(`.${classAdd}`)) { // если нажали  на "В коризну"
                console.log('нажали на кноку В Корзину');
                addToCart(id);
            }

            checkItems(classDelete);
        });
    }

}