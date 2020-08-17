$(function () {
  $('.header__info__btn').on('click', function (e) {
    e.preventDefault();
    $('.popup').toggleClass('popup__open');
  });

  $('.close__btn').on('click', function (e) {
    e.preventDefault();
    $('.popup').removeClass('popup__open')
  });

  $('#send').on('click', function () {
    let name = $('#name').val().trim();
    let tel = $('#tel').val().trim();
    let email = $('#email').val().trim();
    let message = $('#message').val().trim();

    if (name == "") {
      $('.error').text('Введите Имя');
      $('.form__input').addClass('color__input')
      return false;
    } else if (tel == "") {
      $('.error').text('Введите телефон')
      $('.form__input').addClass('color__input')
      return false;
    } else if (email == "") {
      $('.error').text('Введите email')
      $('.form__input').addClass('color__input')
      return false;
    } else if (message.length < 3) {
      $('.error').text('Введите сообщение не менее 3-х символов')
      $('.form__input').addClass('color__input')
      return false;
    } else {
      $('.form__input').removeClass('color__input')
    }

    $('.error').text('');

    $.ajax({
      url: '../mail.php',
      type: 'POST',
      cache: false,
      data: {
        'name': name,
        'tel': tel,
        'email': email,
        'message': message
      },
      dataType: 'html',
      beforeSend: function () {
        $('#send').prop('disabled', true)
      },
      success: function (data) {
        if (!data)
          alert('Ошибка при отправке формы')
        else
          $('.form').trigger('reset');
        $('.form__input').removeClass('color__input')
        $('#send').prop('disabled', false)
        $('.popup').removeClass('popup__open');
        $('.popup__succes').addClass('popup__succes__open');
        $('.succes__close').on('click', function (e) {
          e.preventDefault();
          $('.popup__succes').removeClass('popup__succes__open');
        });
      }
    });
  });


  $('.products__btn').on('click', function (e) {
    e.preventDefault();

    $.get('catalog.html', function (response) {
      $('.products__inner').append(response);
    });

    let current = $('.products__number__items.active');
    let last = $('.products__number__items').last()
    current.removeClass('active');
    current.next('.products__number__items').addClass('active');

    if (current.next('.products__number__items').hasClass('test')) {
      $('.products__btn').css('display', 'none')
    }

  });

});