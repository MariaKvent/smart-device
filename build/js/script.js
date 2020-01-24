'use strict';
var modalCall = document.querySelector('.modal');
var modalToggle = document.querySelector('.modal__toggle');
var modalClose = document.querySelector('.modal__close');
var notScroll = document.querySelector('.page-body');

modalToggle.addEventListener('click', function () {
  modalCall.classList.remove('modal_no-js');
  notScroll.classList.add('scroll-hidden');
});

modalClose.addEventListener('click', function () {
  modalCall.classList.add('modal_no-js');
  notScroll.classList.remove('scroll-hidden');
});

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    modalCall.classList.add('modal_no-js');
    notScroll.classList.remove('scroll-hidden');
  }
});
