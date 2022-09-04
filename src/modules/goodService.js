import { API_URI } from "./var.js" // импортируем из var.js



// получение спсика овароов от сервера:
export const getGoods = () => { // эта функция отпралвеят запрос на сервер и  возвращает промис
    // page - номер станицы

    const pageURL = new URL(location); // location.href;  урл  страницы
    //console.log('pageURL ', pageURL);

    //  "+" превращает из строки в число
    // const page = +pageURL.searchParams.get('page') || 1; // номер текущей страницы, получим значнеие параметра page, если не получим то 1


    const url = new URL(`${API_URI}api/goods`);
    //console.log('pageURL.searchParams.entries() ', pageURL.searchParams.entries()); // [['minprice', '2'],['maxprice', '3'],['category', 'smartphone'],['color', 'red']]

    for (const item of pageURL.searchParams.entries()) { // в ui примеить фильтр, тогда в урле будет http://localhost:3000/?minprice=2&maxprice=3&category=smartphone&maxdisplay=3&mindisplay=4&color=green
        //console.log('item of emtries ', item); // item = [value, <его значение>], ex: ['minprice', '2'] или ['maxprice', '3'] или ['category', 'smartphone']
        url.searchParams.set(item[0], item[1]);
    }

    // if (page) url.searchParams.append('page', page); // к урлу добавили query-параметр page (url?page=2)
    // if (category) url.searchParams.append('category', category); // к урлу добавили query-параметр category: url?category = category

    return fetch(url)
        .then(response => response.json()); // отправляем запрс на сервер, получаем промис, обрабатыаем ответ response.json() и получаем массив товаров [{},{},{}]
};




// получени карточки товара {id, descriptiom, display, category, categoryRus, characteristic, color, image, price, title}, id-товара
export const getGoodsItem = (id) => { // эта функция отпралвеят запрос на сервер и  возвращает промис

    return fetch(`${API_URI}api/goods/${id}`)
        .then(response => response.json()); // отправляем запрс на сервер, получаем промис, обрабатыаем ответ response.json()
}



// получаем  от сервера списко категрий для фильтра 
export const getCategory = () => { //  отправляем запрос на сервер чтоб получить спсиок категорий для фильтра на галвной станице

    return fetch(`${API_URI}api/category`)
        .then(response => response.json()); //  отправляем запрос на сервер и получаем ответ response от сервера   и обрабатываем с помощью response.json()
};



// получаем  от сервера списко категрий для формы подвала ebook: "Электронная книга"
// {
//     monitor: "Мониторы",
//     monoblok: "Моноблоки",
//     notebook: "Ноутбуки",
//     smart: "ТВ-приставки",
//     smartphone: "Смартфоны",
//     smartwatch: "Умные часы",
//     tablets: "Планшеты"
// }
export const getCategoryFooter = () => { //  отправляем запрос на сервер чтоб получить спсиок категорий для фильтра на галвной станице

    return fetch(`${API_URI}api/category`)
        .then(response => response.json()); //  отправляем запрос на сервер и получаем ответ response от сервера   и обрабатываем с помощью response.json()
};




