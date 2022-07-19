export const seviceCounter = ({ selectorWrapper, selectorNumber, selectDec, selectInc }) => { // принимаем объект селекторов, чтобы не заморачиваться с поледоватьльностью передачи парамтеров

    const wrapCounter = document.querySelector(selectorWrapper); //  родитель(обертка) для кнопок
    const numberElem = document.querySelector(selectorNumber); // число  добавленных/убавленных товаров

    wrapCounter.addEventListener('click', (evt) => { // вметсо тго чтобы навешивать обработчик события на каждуюю кнопку(+/-), вешаем его на их родителя, это назвается  делегирование
        const target = evt.target; // элемент на  котрый нажали

        if (target.closest(selectDec)) { // Метод elem.closest('selector') проверяет наличие селектора у элемента elem(причем проверяет наличие селектора и у его  родителей)
            // оператор  + приводит строку к числу
            numberElem.value = +numberElem.value === 1 ? 1 : +numberElem.value - 1;  // т к numberElem это <output></output> у него есть свойтсов value, вместо textContent
        }
        if (target.closest(selectInc)) {
            numberElem.value = +numberElem.value + 1;
        }

    });
};