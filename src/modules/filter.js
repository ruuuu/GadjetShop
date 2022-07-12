import { getCategory } from "./goodService";
import { getCategoryFooter } from "./goodService";


export const filter = () => {

    const category = document.querySelector('#category'); // выпадающий спсико КАтегория <select></select>, сюда будем добавлять созданеы <option></tion>

    getCategory().then((categoryList) => { // categoryList -спсиок категрий полченный от сервера
        // console.log('categoryList ', categoryList); // {notebook: 'Ноутбуки', smartphone: 'Смартфоны', smartwatch: 'Умные часы', tablets: 'Планшеты', monoblok: 'Моноблоки', …}

        for (const categoryListKey in categoryList) { // ОБЪЕКТ НЕЛЬЗЯ ПЕРЕБРАТЬ С ПОМОЩЬЮ map(как массив), или С ПОМОЩЬЮ for each. Можно перебрать с помощью for in
            // console.log('category ', category);

            const option = document.createElement('option'); // <option> </option>
            //option.setAttribute('value', categoryListKey);  //   <option value=""> </option>
            option.value = categoryListKey;
            option.textContent = categoryList[categoryListKey];
            category.append(option);
        }
    });


    const filterForm = document.querySelector('.filter__form'); //  форма фиьтра

    filterForm.addEventListener('submit', (evt) => {
        evt.preventDefault(); // evt - обхект события, отменяпм действиеп умолчанию. то  есть перзагрзка станицы

        const checkboxes = new Set(); // это коллекция(это псевдомассив, у него нет методов котрые ест у массива)  [] и в ней элементы ен повторяются. Ниже в меоде forEach()  заполним ее
        console.log('checkboxes ', checkboxes);
        //checkbox.add(13); // добавили в коллецию 13
        // console.log(filterForm.elements); // получаем элементы формы,это псевдомассив [button.filter__reset, fieldset.filter__fileld, input.filter__input]
        // console.log(...filterForm.elements); //  получим уже эелменты в виде тэгов
        //console.log([...filterForm.elements]); //из псевдомассива сделали массив [button.filter__reset, fieldset.filter__fileld, input.filter__inp]

        [...filterForm.elements].forEach((elem) => { // метод forEachприменяет переданную фукнию к кажд ому элементу массива
            console.log(elem);
            if (elem.type === 'checkbox') {
                checkboxes.add(elem.name); //  добавлям в коллекцию name у  чекбокса
            }

        });

        //console.log(checkboxes);

        const data = {};

        const formData = new FormData(filterForm); //  это коллекия
        // ОСТАНОВИЛАСЬ на 25:25


    });

    // new FormData(filterForm) и пербираем это через for Of
};




// ДЗ:
export const filterFooter = () => {

    const categoryFooterList = document.querySelector('.footer__list'); // ul сюда бдуем скадвать созданеы li

    getCategoryFooter().then((categoryList) => { // categoryList -спсиок категрий полченный от сервера
        console.log('categoryList ', categoryList); // {notebook: 'Ноутбуки', smartphone: 'Смартфоны', smartwatch: 'Умные часы', tablets: 'Планшеты', monoblok: 'Моноблоки', …}

        for (const categoryListKey in categoryList) { // ОБЪЕКТ НЕЛЬЗЯ ПЕРЕБРАТЬ С ПОМОЩЬЮ map(как массив), или С ПОМОЩЬЮ for each. Можно перебрать с помощью for in
            //console.log('category ', category);

            const li = document.createElement('li'); // <li> </li>
            li.className = 'footer__item';
            const a = document.createElement('a');  // <a></a>
            a.className = 'footer__link';
            a.href = "#";
            li.append(a);

            a.textContent = categoryList[categoryListKey];
            categoryFooterList.append(li);
        }
    });

};




//  // лоадер добавялем
//  goodsList.innerHTML = `
//  <div class="goods__preload"> 
//     <svg width="256" height="256" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path opacity="0.5" d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" fill="black"/>
//     <path d="M20 12H22C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12Z" fill="black"/>
//     </svg>
//  </div>
// `;

//     getGoods().then(({ goods, pages, page }) => { // деструктуризация
//         console.log('data ', { goods, pages, page });
//         //console.log('goods ', goods);
//         renderGoods(goodsList, goods); // отрисовываем карточки товаров, полученные от сервера  goods = [{},{},{},{},{}]
//         startPagination(paginataionWrapper, pages, page); // 50- число страниц(котрые в блоке пагинации )
//     })