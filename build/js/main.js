'use strict';

(function () {
  var body = document.querySelector('.page-body');
  var modalOpenButton = body.querySelector('.contact-info__button');
  var modalWindow = body.querySelector('.modal');
  var closeModal = modalWindow.querySelector('.modal__close-button');
  var moadlUserName = modalWindow.querySelector('#name-modal');
  var moadlUserPhone = modalWindow.querySelector('#phone-modal');
  var moadlUserQuestion = modalWindow.querySelector('#question-modal');

  var setModalsClass = function (main, modal) {
    main.classList.toggle('page-body--modal');
    modal.classList.toggle('modal--close');
  };

  var setStorageValue = function () {
    localStorage.setItem('userName', moadlUserName.value);
    localStorage.setItem('userPhone', moadlUserPhone.value);
    localStorage.setItem('userQuestion', moadlUserQuestion.value);
  };

  var getStorageValue = function () {
    moadlUserName.value = localStorage.getItem('userName');
    moadlUserPhone.value = localStorage.getItem('userPhone');
    moadlUserQuestion.value = localStorage.getItem('userQuestion');
  };

  var setEvent = function () {
    modalOpenButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      setModalsClass(body, modalWindow);
      getStorageValue();
      moadlUserName.focus();
    });

    closeModal.addEventListener('click', function () {
      setStorageValue();
      setModalsClass(body, modalWindow);
    });
    window.addEventListener('click', function (evt) {
      if (evt.target === modalWindow) {
        setStorageValue();
        setModalsClass(body, modalWindow);
      }
    });
  };

  window.modal = {
    setModal: function () {
      setEvent();
    }
  };

})();

(function () {
  var MOBILE_WIDTH = 320;
  var accordionMenu = document.querySelectorAll('.footer-block');

  var setDefaultAccordion = function () {
    accordionMenu.forEach(function (element) {
      var accordionButton = element.querySelector('.footer-block__button');
      accordionButton.classList.add('footer-block__button--show');
      element.classList.add('footer-block--hidde');
    });
  };

  var setCommonSate = function () {
    accordionMenu.forEach(function (element) {
      var accordionButton = element.querySelector('.footer-block__button');
      accordionButton.classList.add('footer-block__button--show');
      accordionButton.addEventListener('click', function () {
        accordionButton.classList.toggle('footer-block__button--show');
        element.classList.toggle('footer-block--hidde');
      });
    });

    if (window.innerWidth <= MOBILE_WIDTH) {
      setDefaultAccordion();
    }
  };

  var setCommonEvents = function () {
    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_WIDTH) {
        accordionMenu.forEach(function (element) {
          var accordionButton = element.querySelector('.footer-block__button');
          element.classList.remove('footer-block--hidde');
          accordionButton.classList.remove('footer-block__button--show');
        });
      } else {
        setDefaultAccordion();
      }
    });
  };

  window.accordion = {
    setAccordion: function () {
      setCommonSate();
      setCommonEvents();
    }
  };

})();

(function () {
  var phoneInputs = document.querySelectorAll('.common-form__wrapper input[type = "tel"]');

  var setPhoneEvents = function () {
    phoneInputs.forEach(function (element) {
      element.addEventListener('focus', function () {
        if (!(element.value.includes('+7('))) {
          element.value = '+7(';
        }
      });
      element.addEventListener('keypress', function (evt) {
        var str = element.value;
        if (parseInt(evt.key, 10)) {
          if (str.length === 6) {
            element.value = str + ')';
          }
          if (str.length === 14) {
            evt.returnValue = false;
          }
        } else {
          evt.returnValue = false;
        }
      });
    });
  };

  window.phone = {
    setPhone: function () {
      setPhoneEvents();
    }
  };

})();

window.modal.setModal();
window.accordion.setAccordion();
window.phone.setPhone();