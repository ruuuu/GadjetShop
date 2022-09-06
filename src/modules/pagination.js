const createItemPagination = (hrefLink, textContent, active) => {


    const li = document.createElement('li');
    li.className = 'pagination__item';

    const a = document.createElement('a');          // в др приложениях(котрые не перезагружают страницу) вместо ссылок могут быть кнопки
    a.className = 'pagination__link';

    a.href = hrefLink;
    a.textContent = textContent;

    if (active) {       // если ссылка активняа
        a.classList.add('pagination__link--active');
    }

    console.log('a', a);
    li.append(a);       // <li class="pagination__item"><a class="pagination__link" href="http://localhost:3000/index.html?page=1"></a></li>

    return li;          // <li>...</li>
};




//           pagination(paginataionWrapper, 20, page, 6)
const pagination = (wrapper, pages, page, count) => { // pages- колво страниц, page-№ тек страницы   
    wrapper.textContent = '';//  очищаем обертку

    const paginationList = document.createElement('ul'); // <ul></ul>
    paginationList.classList.add('pagination__list');
    // а можно так: paginationList.className = 'pagination__list';

    const isNotStart = page - Math.floor(count / 2) > 1; // не первая страница ?
    const isEnd = page + Math.floor(count / 2) > pages; // не последняя страница ?

    if (count > pages) {
        count = pages;
    }

    for (let i = 0; i < count; i++) {     // count- колво страниц отображаемх на странице
        // console.log('page === n ', page === n);
        // console.log('page ', page);
        // console.log('n ', n);

        let n = i + 1;  // номер активной страницы

        if (isNotStart) {   // если не первая
            if (isEnd) {    // если не последняя
                n = pages - count + i + 1;
            }
            else {
                n = page - Math.floor(count / 2) + i;
            }
        }

        const url = new URL(location);      // созздаем урл на основе существуюещего, те  есть  localhost/?page=2

        console.log('url from pagination', url);
        url.searchParams.set('page', n);        // устананавливаем  query-парамтер page=n
        //                             `index.html?page=${n}`
        const li = createItemPagination(url, n, page === n);        // n-номер страницы, page-номер страницы  на котрой находимся
        paginationList.append(li);
    }



    const firstItem = document.createElement('a'); //  <a></a> для левой стрелки
    firstItem.classList.add('pagination__arrow', 'pagination__arrow--start');
    firstItem.href = isNotStart ? 'index.html' : ''; // если не первая станица то на index.html


    const lastItem = document.createElement('a'); //  <a></a> для правой стрелки
    lastItem.classList.add('pagination__arrow', 'pagination__arrow--end');
    lastItem.href = isEnd ? '' : `index.html?page=${pages}`; // если не послденяя станица то на index.html?page=${pages}


    wrapper.append(firstItem, paginationList, lastItem); // порядок добавления элементов имеет значение!!!
};





export const startPagination = (paginataionWrapper, pages, page) => { // pages- число страниц в  блоке пагинация
    let isMobile = false; //  не моб версия

    if (window.innerWidth < 560) { // window- наш бразуер, innerWidth его ширина
        pagination(paginataionWrapper, pages, page, 4); // wrapper, pages, page, count
        isMobile = true;
    }
    else {
        pagination(paginataionWrapper, pages, page, 6); //  вызов фукнции, передаем число страниц(20), page=номер текущй страницы, сколкь мах станиц отображать(6) и обертку станицы(элементс .pagination)
        isMobile = false;
    }


    window.addEventListener('resize', () => { // событе resize - изменение размера окна браузера 
        if (window.innerWidth <= 560 && !isMobile) { // windows - наш бразуер, innerWidth его ширина
            pagination(paginataionWrapper, 20, page, 4);
            isMobile = true;
        }
        if (window.innerWidth > 560 && isMobile) {
            pagination(paginataionWrapper, 20, page, 6); //  вызов фукнции, передаем число страниц(20), page=номер текущй страницы, сколкь мах станиц отображать(6) и обертку станицы(элементс .pagination)
            isMobile = false;
        }
    });
};






