'use strict';
var modalCall = document.querySelector('.modal');
var modalToggle = document.querySelector('.button__toggle');
var modalClosed = document.querySelector('.modal__closed');
var pageBody = document.querySelector('.page-body');
var focusOnName = document.getElementById('modal-name');
var footerAboutMain = document.querySelector('.footer__about-main');

var showModal = function () {
  if (modalCall) {
    modalCall.classList.remove('modal_hide');
  }
  if (pageBody) {
    pageBody.classList.add('scroll-hidden');
  }
  if (focusOnName) {
    focusOnName.focus();
  }
};

var closeModal = function () {
  if (modalCall) {
    modalCall.classList.add('modal_hide');
  }
  if (pageBody) {
    pageBody.classList.remove('scroll-hidden');
  }
};
if (modalToggle) {
  modalToggle.addEventListener('click', function () {
    showModal();
  });
}
if (modalClosed) {
  modalClosed.addEventListener('click', function () {
    closeModal();
  });
}
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    closeModal();
  }
});

document.addEventListener('mouseup', function (e) {
  if (e.target === modalCall) {
    closeModal();
  }
});

// создание измененного поля копирайт и линий в подвале
var cloneCopy = function () {
  if (footerAboutMain) {
    if (window.screen.width < 767) {
      if (footerAboutMain.querySelector('.clone__lines') === null) {
        var clonedNode2 = document.createElement('hr');
        clonedNode2.className = 'clone__lines';
        clonedNode2.style.color = '#626962';
        clonedNode2.style.height = '1px';
        clonedNode2.style.width = '100%';
        clonedNode2.style.margin = '0';
        var acc2 = document.querySelector('.footer__about-contacts');

        if (acc2) {
          var footerAbout = document.querySelector('.footer__about');
          if (footerAbout) {
            footerAbout.insertBefore(clonedNode2, acc2);
          }
        }
      }

      var startMobileButton = document.querySelector('.start__text-button');
      if (startMobileButton) {
        startMobileButton.innerHTML = 'Бесплатная консультация';
      }
    } else {
      var startButton = document.querySelector('.start__text-button');
      if (startButton) {
        startButton.innerHTML = 'Получить бесплатную консультацию';
      }
    }
    if (window.screen.width < 1024) {

      if (footerAboutMain.querySelector('.clone__lines') === null) {
        var clonedNode = document.createElement('hr');
        clonedNode.className = 'clone__lines';
        clonedNode.style.color = '#626962';
        clonedNode.style.height = '1px';
        clonedNode.style.width = '100%';
        clonedNode.style.margin = '0';
        var acc = document.querySelector('.footer__about-site');
        if (acc) {
          var footerAbout = document.querySelector('.footer__about');
          if (footerAbout) {
            footerAbout.insertBefore(clonedNode, acc);
          }
        }
      }

      if (footerAboutMain.querySelector('.clone__copyright') === null) {
        var div = document.createElement('div');
        div.innerHTML = '1999-2018 SD Service Devices';
        div.className = 'clone__copyright';
        div.style.color = '#666666';
        div.style.opacity = '0.5';
        div.style.textTransform = 'uppercase';
        div.style.fontSize = '13px';
        div.style.lineHeight = '24px';
        div.style.letterSpacing = '0.04em';
        div.style.paddingTop = '15px';
        div.style.order = '2';
        footerAboutMain.appendChild(div);
      }
    }
  }
};

cloneCopy();

window.onresize = function () {
  var elements = document.getElementsByClassName('clone__copyright');
  if (elements) {
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  var elements2 = document.getElementsByClassName('clone__lines');
  if (elements2) {
    while (elements2.length > 0) {
      elements2[0].parentNode.removeChild(elements2[0]);
    }
  }
  cloneCopy();
};

// аккордеон
var acc = document.getElementsByClassName('accordeon');
if (acc) {
  for (var j = 0; j < acc.length; j++)
  {
    acc[j].addEventListener('click', function (event) {
      var accSite = event.currentTarget;
      accSite.classList.toggle('active');
      var items = accSite.lastElementChild;
      if (items.style.maxHeight) {
        items.style.maxHeight = null;
      } else {
        items.style.maxHeight = items.scrollHeight + 'px';
      }
    });
  }
}

// плавный скролл до якоря
var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
var animationTime = 600;
var framesCount = 30;

anchors.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    var scroller = setInterval(function () {
      var scrollBy = coordY / framesCount;

      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  });
});

// маска и валидация номера телефона в попапе
window.addEventListener('DOMContentLoaded', function () {
  function setCursorPosition(pos, inpModal) {
    inpModal.focus();
    if (inpModal.setSelectionRange) {
      inpModal.setSelectionRange(pos, pos);
    } else if (inpModal.createTextRange) {
      var range = inpModal.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(event) {
    var matrix = '+7(___)_______';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var modalTel = event.currentTarget;
    var val = modalTel.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    modalTel.value = matrix.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < (val.length + 1)) {
        return val.charAt(i++);
      } else {
        if (i >= (val.length + 1)) {
          return '';
        } else {
          return a;
        }
      }
    });
    if (event.type === 'blur') {
      if (modalTel.value.length === 3) {
        modalTel.value = '';
      }
    } else {
      if (modalTel.value[modalTel.value.length - 1] === ')') {
        modalTel.value = modalTel.value.substring(0, modalTel.value.length - 1);
      }
      setCursorPosition(modalTel.value.length, modalTel);
    }
  }
  function setCallBacks(element) {
    element.addEventListener('input', mask, false);
    element.addEventListener('focus', mask, false);
    element.addEventListener('blur', mask, false);
  }

  var input = document.querySelector('#modal-tel');
  if (input) {
    setCallBacks(input);
  }

  var input2 = document.querySelector('#form-tel');
  if (input2) {
    setCallBacks(input2);
  }
});

// запись в Local Storage
var elements = document.querySelectorAll('input, textarea');

function checkValidity() {}

if (elements) {
  for (var i = 0; i < elements.length; i++) {
    (function (element) {
      var id = element.getAttribute('id');
      element.value = localStorage.getItem(id);
      element.oninput = function () {
        localStorage.setItem(id, element.value);
        checkValidity();
      };
    })(elements[i]);
  }
}
