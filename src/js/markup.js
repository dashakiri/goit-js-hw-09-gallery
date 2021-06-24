'use strict'
import { galleryItems } from "../app.js";

export const galleryRef = document.querySelector('.gallery');

// создает разметку галереи 

function makeGalery(array) {

        const galleryItem = array.map((element, index) => {
        const { preview, original, description } = element;

        // console.log(description);

        const div = document.createElement('div');
        div.classList.add('gallery__item');

        const link = document.createElement('a');
        link.classList.add('gallery__link');
        link.setAttribute('href', `${original}`);
        link.setAttribute('data-index', `${index}`);


        const image = document.createElement('img');
        image.classList.add('gallery__image');
        image.classList.add('lazyload');
            image.setAttribute('src', `${preview}`);
            image.setAttribute('data-src', `${preview}`);
        image.setAttribute('alt', `${description}`);
        image.setAttribute('data-source', `${original}`);
        image.setAttribute('data-index', `${index}`);
        image.setAttribute('width', '340px');
        image.setAttribute('height', '240px');

        link.append(image);
        div.append(link);

        // console.log(image.dataset.index)

        return div;
    });

    galleryRef.append(...galleryItem);

    return;
};

makeGalery(galleryItems);