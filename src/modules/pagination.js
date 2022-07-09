const createItemPagination = (hrefLink, textContent, active) => {


    const li = document.createElement('li');
    li.className = 'pagination__item';

    const a = document.createElement('a'); // в др приложениях(котрые не перезагружают страницу) вместо ссылок могут быть кнопки
    a.className = 'pagination__link';

    a.href = hrefLink;
    a.textContent = textContent;

    if (active) { // если ссылка активняа
        a.classList.add('pagination__link--active');
    }

    console.log('a', a);
    li.append(a); // <li class="pagination__item"><a class="pagination__link" href="http://localhost:3000/index.html?page=1"></a></li>

    return li;  // <li></li>
};




//           pagination(paginataionWrapper, 20, page, 6)
export const pagination = (wrapper, pages, page, count) => { // pages- колво страниц, page-№ тек страницы   
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

        let n = i + 1; // номер активной страницы

        if (isNotStart) { // если не первая
            if (isEnd) { // если не последняя
                n = pages - count + i + 1;
            }
            else {
                n = page - Math.floor(count / 2) + i;
            }
        }


        const li = createItemPagination(`index.html?page=${n}`, n, page === n); // n-номер страницы, page-№ текущей страницы
        paginationList.append(li);
    }



    const firstItem = document.createElement('a'); //  <a></a> для левой стрелки
    firstItem.classList.add('pagination__arrow', 'pagination__arrow--start');
    firstItem.href = isNotStart ? 'index.html' : ''; // если не первая станица то на index.html


    const lastItem = document.createElement('a'); //  <a></a> для левой стрелки
    lastItem.classList.add('pagination__arrow', 'pagination__arrow--end');
    lastItem.href = isEnd ? '' : `index.html?page=${pages}`; // если не послденяя станица то на index.html


    wrapper.append(firstItem, paginationList, lastItem); // порядок добавления элементов имеет значение!!!




};




//<li class="pagination__item pagination__item--active">
    //   <a class="pagination__link pagination__link--active" href="">1</a>
//</li >
