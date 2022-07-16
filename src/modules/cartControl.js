
// добавление товара в лок хранлище
const addToCart = (id, count = 1) => { // id - id товара, count- число товара(с id) в корзине. Если count не передали то предадим 1

    //  cartGoods = {
    //      id1: count, 
    //      id2: count, 
    //      id3: count
    //   } - объект
    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // получаем из locastorage днные по ключу cart-ts, данные в  нем хранятся в виде JSON, поэтому парсим JSON.parse
    cartGoods[id] = count; // добавляепм товар с идентификаром id в объект(корзина)

    localStorage.setItem('cart-ts', JSON.stringify(cartGoods)); // запсиывем в лок ханилище обнолвенные данные, сперва превращаем в json методом JSON.stringify 

};




// удалеение товара из лок хранлища, при нажатии на крестик(на cart.hrml), будем вызыват эту фукницю
const removeToCart = (id) => { // id - id товара

    //  cartGoods = {id: count} - объект
    const cartGoods = localStorage.getItem('cart-ts') ? JSON.parse(localStorage.getItem('cart-ts')) : {}; // получаем из locastorage днные по ключу cart-ts, данные в  нем хранятся в виде JSON, поэтому парсим JSON.parse


    delete cartGoods[id]; // удаляем элемент из объекта


    localStorage.setItem('cart-ts', JSON.stringify(cartGoods)); // запсиывем в лок ханилище обноленные  данные, сперва превращаем в json методом JSON.stringify 

};



const checkItems = () => { // проверяет число товаров в корзине и указваем число торвоав   с чтечике(псевдоэлемент-зеленый кружлчек на корзине)

};



export const cartControl = ({ }) => {

}