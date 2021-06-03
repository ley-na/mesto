import { cardsInfo, config } from './constants.js';
import { Card } from './Card.js';

const overlayEditProfile = document.querySelector('.overlay-edit-profile');
const titleEditProfile = document.querySelector(".profile__title");
const subtitleEditProfile = document.querySelector(".profile__subtitle");
const buttonShowEditProfilePopup = document.querySelector(".profile__button-edit-profile");
const popupEditProfile = overlayEditProfile.querySelector('.popup');
const buttonCloseEditProfilePopup = popupEditProfile.querySelector(".popup__button-close");

const formEditProfilePopup = popupEditProfile.querySelector(".popup__form");
const inputUserName = formEditProfilePopup.querySelector('.popup__text_data_title');
const inputUserJob = formEditProfilePopup.querySelector('.popup__text_data_subtitle');

const overlayAddPhoto = document.querySelector('.overlay-add-photo');
const buttonShowAddPhotoPopup = document.querySelector('.profile__button-add-photo');
const popupAddPhoto = overlayAddPhoto.querySelector('.popup');
const buttonCloseAddPhotoPopup = popupAddPhoto.querySelector('.popup__button-close');

const formAddPhotoPopup = popupAddPhoto.querySelector('.popup__form');
const inputPhotoName = formAddPhotoPopup.querySelector('.popup__text_data_title');
const inputPhotoLink = formAddPhotoPopup.querySelector('.popup__text_data_subtitle');

const sectionCards = document.querySelector('.places');

const overlayViewPhoto = document.querySelector('.overlay-view-photo');
const imageViewPhoto = overlayViewPhoto.querySelector('.popup__image');
const titleViewPhoto = overlayViewPhoto.querySelector('.popup__title');
const buttonCloseViewPhotoPopup = overlayViewPhoto.querySelector('.popup__button-close');

const cardTemplate = document.querySelector('#article-template').content;

function createCards() {
    cardsInfo.forEach(cardInfo => {
        const card = new Card (cardInfo.name, cardInfo.link, cardTemplate, showViewPhotoPopup);
        sectionCards.append(card.getCard());
    });
}

function openPopup(overlay) {
    overlay.classList.add('overlay_visible');
    overlay.focus();                             
    addCloseOverlayByEscape(overlay);      
    addCloseOverlayByClickOutside(overlay);
}

function closePopup(overlay) {
    overlay.classList.remove('overlay_visible');
    removeCloseOverlayByEscape(overlay);  
    removeCloseOverlayByClickOutside(overlay);
}

function onShowEditProfilePopup() {
    setDefaultUserInfoInputs(titleEditProfile.textContent, subtitleEditProfile.textContent);
    openPopup(overlayEditProfile);
}

const updateInputValue = (inputElement, value) => {
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input'));
};

function setDefaultUserInfoInputs(name, job) {
    updateInputValue(inputUserName, name);
    updateInputValue(inputUserJob, job);
}

function onCloseEditProfilePopup() {
    closePopup(overlayEditProfile);
}

function onShowAddPhotoPopup() {
    openPopup(overlayAddPhoto);
    inputPhotoName.dispatchEvent(new Event('input'));
    inputPhotoLink.dispatchEvent(new Event('input'));
}

function onCloseAddPhotoPopup() {
    closePopup(overlayAddPhoto);
}

function onSubmitFormEditProfilePopup(evt) {
    evt.preventDefault();
    setEditProfileTitles(inputUserName.value, inputUserJob.value);
    closePopup(overlayEditProfile);
}

function onSubmitFormAddPhotoPopup(evt) {
    evt.preventDefault();

    const cardInfo = { 
        name: inputPhotoName.value, 
        link: inputPhotoLink.value 
    };
    
    const card = new Card (cardInfo.name, cardInfo.link, cardTemplate, showViewPhotoPopup);
    sectionCards.prepend(card.getCard());
    formAddPhotoPopup.reset();
    
    closePopup(overlayAddPhoto);
}

function setEditProfileTitles(name, job) {
    titleEditProfile.textContent = name;
    subtitleEditProfile.textContent = job;
}

function showViewPhotoPopup(evt) {
    imageViewPhoto.setAttribute('src', evt.target.src);
    imageViewPhoto.setAttribute('alt', evt.target.alt);
    titleViewPhoto.textContent = imageViewPhoto.getAttribute('alt').substr(imageViewPhoto.getAttribute('alt').indexOf(' '));
    openPopup(overlayViewPhoto);
}

function onCloseViewPhotoPopup() {
    closePopup(overlayViewPhoto);
}

function closePopupOnEscape(event) {
    if (event.code === 'Escape') {
        if (event.target.classList.contains('overlay')) {
            closePopup(event.target);
        }
    }
}

function addCloseOverlayByEscape(overlay) {
    overlay.addEventListener('keydown', closePopupOnEscape)
}

function removeCloseOverlayByEscape(overlay) {
    overlay.removeEventListener('keydown', closePopupOnEscape)
}

function addCloseOverlayByClickOutside(overlay) {
    overlay.addEventListener('mousedown', closePopupOnClickOverlay)
}

function removeCloseOverlayByClickOutside(overlay) {
    overlay.removeEventListener('mousedown', closePopupOnClickOverlay)
}

function closePopupOnClickOverlay(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
} 

document.addEventListener("DOMContentLoaded", createCards);

buttonShowEditProfilePopup.addEventListener('click', onShowEditProfilePopup);
buttonCloseEditProfilePopup.addEventListener('click', onCloseEditProfilePopup);

buttonShowAddPhotoPopup.addEventListener('click', onShowAddPhotoPopup);
buttonCloseAddPhotoPopup.addEventListener('click', onCloseAddPhotoPopup);

formAddPhotoPopup.addEventListener('submit', onSubmitFormAddPhotoPopup);
buttonCloseViewPhotoPopup.addEventListener('click', onCloseViewPhotoPopup);

formEditProfilePopup.addEventListener('submit', onSubmitFormEditProfilePopup);
