// overlay-затемненный фон

const overlay = document.createElement('div'); // <div></div>
overlay.style.cssText = ` 
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 333;
    background-color: rgba(0, 0, 0, 0.5);

`;


export const showOverlay = () => { // показываем оверлей
    document.body.append(overlay); // <body><div></div></body>
};



export const hideOverlay = () => { // показываем оверлей
    overlay.remove(); // удалить со станицы элемент можно методом remove() 
};
