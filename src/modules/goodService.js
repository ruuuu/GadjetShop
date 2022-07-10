import { API_URI } from "./var.js" // импортируем из vr.js

export const getGoods = ({ page }) => { // эта функция оотпралвеят запрос на сервер и  возвращает промис
    // page - номер станицы

    const url = new URL(`${API_URI}api/goods`)

    if (page) url.searchParams.append('page', page); //к урлу добавили query параметр page (url?page=2)
    return fetch(url).then(response => response.json()) // отправляем запрс на сервер, получаем промис, обрабатыаем ответ response.json()

}

