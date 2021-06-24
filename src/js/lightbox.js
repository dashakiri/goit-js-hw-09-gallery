'use strict'
import { galleryRef } from "./markup.js";
import { galleryItems } from "../app.js";

const lightbox = {
    mainContainer: document.querySelector('.lightbox'),
    overlayContainer: document.querySelector('.lightbox__overlay'),
    imageContainer: document.querySelector('.lightbox__content'),
    lightboxImage: document.querySelector('.lightbox__image'),
    closeLightboxButton: document.querySelector('.lightbox__button'),
};

const { mainContainer, overlayContainer, imageContainer, lightboxImage, closeLightboxButton } = lightbox;

// подменяет значение атрибута src и открывает модальное окно по клику на картинку

let currentIndex;

galleryRef.addEventListener('click', onOpenLightbox);

function onOpenLightbox(event) {
    event.preventDefault()

    const galleryImage = event.target;

    if (galleryImage.nodeName !== 'IMG') {
        return;
    };

    lightboxImage.src = galleryImage.dataset.source;
    lightboxImage.alt = galleryImage.alt;
    currentIndex = +galleryImage.dataset.index;

    console.log(currentIndex);

    window.addEventListener('keydown', onEscapeKeyPress);
    window.addEventListener('keydown', onArrowLeft);
    window.addEventListener('keydown', onArrowRight);
    
    mainContainer.classList.add('is-open');
};

// закрывает модальное окно по клику на кнопку закрыть

closeLightboxButton.addEventListener('click', onCloseLightbox);

function onCloseLightbox() {
    mainContainer.classList.remove('is-open');

    window.removeEventListener('keydown', onEscapeKeyPress);
    window.removeEventListener('keydown', onArrowLeft);
    window.removeEventListener('keydown', onArrowRight);

    lightboxImage.src = '';
    lightboxImage.alt = '';
};

// // Закрытие модального окна по клику на div.lightbox__overlay.

overlayContainer.addEventListener('click', onCloseLightbox);

// // Закрытие модального окна по нажатию клавиши ESC.

function onEscapeKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';

    if (ESC_KEY_CODE === event.code) {
        onCloseLightbox(event);
    };
    return;
};

// // Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

function onArrowLeft(event) {
    if (event.code === "ArrowLeft") {
        if (currentIndex - 1 < 0) {
            currentIndex = galleryItems.length - 1;
        } else {
            currentIndex -= 1;
        }

        lightboxImage.src = galleryItems[currentIndex].original;
        lightboxImage.alt = galleryItems[currentIndex].description;
        
    }
}

function onArrowRight(event) {
    if (event.code === "ArrowRight") {
		if (currentIndex + 1 > galleryItems.length - 1) {
			currentIndex = 0;
		} else {
			currentIndex += 1;
		}
		lightboxImage.src = galleryItems[currentIndex].original;
		lightboxImage.alt = galleryItems[currentIndex].description;
	}
    
    }