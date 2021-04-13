'use strict';

(function () {
  var body = document.querySelector('.page-body');
  var modalOpenButton = body.querySelector('.contact-info__button');
  var modalWindow = body.querySelector('.modal');
  var modalUserName = document.querySelector('#name-modal');
  var modalUserPhone = document.querySelector('#phone-modal');
  var modalUserQuestion = document.querySelector('#question-modal');

  var setModalsClass = function (main, modal) {
    main.classList.toggle('page-body--modal');
    modal.classList.toggle('modal--close');
  };

  var setStorageValue = function () {
    localStorage.setItem('userName', modalUserName.value);
    localStorage.setItem('userPhone', modalUserPhone.value);
    localStorage.setItem('userQuestion', modalUserQuestion.value);
  };

  var getStorageValue = function () {
    modalUserName.value = localStorage.getItem('userName');
    modalUserPhone.value = localStorage.getItem('userPhone');
    modalUserQuestion.value = localStorage.getItem('userQuestion');
  };

  var setEvent = function () {
    var closeModal = modalWindow.querySelector('.modal__close-button');
    modalOpenButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      setModalsClass(body, modalWindow);
      getStorageValue();
      modalUserName.focus();
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
      if (modalOpenButton || modalWindow) {
        setEvent();
      }
    }
  };

})();

(function () {
  var MOBILE_WIDTH = 767;
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
      accordionButton.addEventListener('click', function (evt) {
        var openedFlag = evt.target.classList.contains('footer-block__button--show');
        evt.preventDefault();
        var openedBlock = document.querySelectorAll('.footer-block');
        openedBlock.forEach(function (e) {
          if (!e.classList.contains('footer-block--hidde')) {
            e.classList.add('footer-block--hidde');
          }
        });

        var openedButton = document.querySelectorAll('.footer-block__button');
        openedButton.forEach(function (e) {
          if (!e.classList.contains('footer-block__button--show')) {
            e.classList.add('footer-block__button--show');
          }
        });

        accordionButton.classList.toggle('footer-block__button--show');
        element.classList.toggle('footer-block--hidde');
        if (!openedFlag) {
          accordionButton.classList.add('footer-block__button--show');
          element.classList.add('footer-block--hidde');
        }
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
      if (accordionMenu) {
        setCommonSate();
        setCommonEvents();
      }
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

      element.addEventListener('keyup', function () {
        var str = element.value;
        if (str.length <= 2) {
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
      if (phoneInputs) {
        setPhoneEvents();
      }
    }
  };

})();

window.modal.setModal();
window.accordion.setAccordion();
window.phone.setPhone();
