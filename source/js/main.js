'use strict';

(function () {
  var body = document.querySelector('.page-body');
  var modalOpenButton = body.querySelector('.contact-info__button');
  var modalWindow = body.querySelector('.modal');
  var closeModal = modalWindow.querySelector('.modal__close-button');

  var setModalsClass = function (main, modal) {
    main.classList.toggle('page-body--modal');
    modal.classList.toggle('modal--close');
  };

  var setEvent = function () {
    modalOpenButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      setModalsClass(body, modalWindow);
    });

    closeModal.addEventListener('click', function () {
      setModalsClass(body, modalWindow);
    });
    window.addEventListener('click', function (evt) {
      if (evt.target === modalWindow) {
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

window.modal.setModal();
window.accordion.setAccordion();
