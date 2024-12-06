const ru = {
  translation: {
    form: {
      login: {
        buttons: {
          signIn: 'Войти',
        },
        headline: 'Войти',
        labels: {
          username: 'Ваш ник',
          password: 'Пароль',
        },
        footerText: 'Нет аккаунта?',
        footerLink: 'Регистрация',
        errors: {
          validation: {
            required: 'Обязательное поле',
          },
          err401: 'Неверные имя пользователя или пароль',
        },
      },

      signup: {
        buttons: {
          signup: 'Зарегистрироваться',
        },
        headline: 'Регистрация',
        labels: {
          username: 'Имя пользователя',
          password: 'Пароль',
          confirmPassword: 'Подтвердите пароль',
        },
        footerText: 'Уже зарегистрированы?',
        footerLink: 'Войти',
        errors: {
          validation: {
            userNameLength: 'От 3 до 20 символов',
            passwordLength: 'Не менее 6 символов',
            required: 'Обязательное поле',
            passwordMatch: 'Пароли должны совпадать',
          },
          err409: 'Такой пользователь уже существует',
        },
      },
      newMessage: {
        label: 'Введите сообщение',
        placeholder: 'Введите сообщение',
        submit: 'Отправить',
      },
    },

    errors: {
      noNetwork: 'Ошибка соединения',
      // 505
      dataLoadError: 'Не удалось загрузить данные',
      dataSendError: 'Не удалось отправить данные',
    },

    header: {
      buttons: {
        signout: 'Выйти',
        languages: {
          ru: 'Перевести на русский',
          en: 'Перевести на английский',
        },
      },
    },

    channelWindow: {
      messagesCount: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },

    channelsList: {
      headline: 'Каналы',
      addChannelBtn: 'Добавить канал',
      toggleChannelsList: {
        hide: 'Скрыть список каналов',
        show: 'Открыть список каналов',
      },
      channelDropDown: {
        toggle: 'Управление каналом',
        rename: 'Переименовать',
        remove: 'Удалить',
      },
      modals: {
        addChannel: {
          headline: 'Добавить канал',
          label: 'Имя канала',
        },
        renameChannel: {
          headline: 'Переименовать канал',
          label: 'Имя канала',
        },
        removeChannel: {
          headline: 'Удалить канал',
          text: 'Уверены?',
          submit: 'Удалить',
        },
        buttons: {
          cancel: 'Отменить',
          submit: 'Отправить',
        },
        validationErrors: {
          channelNameLength: 'От 3 до 20 символов',
          unique: 'Должно быть уникальным',
          required: 'Обязательное поле',
        },
      },
    },

    toasts: {
      addChannelSuccess: 'Канал добавлен!',
      addChannelError: 'Не удалось добавить канал',
      renameChannelSuccess: 'Канал переименован!',
      renameChannelError: 'Не удалось переименовать канал',
      removeChannelSuccess: 'Канал удален!',
      removeChannelError: 'Не удалось удалить канал',
    },

    error404: {
      title: 'Страница не найдена...',
      returnLink: 'Вернуться на главную страницу',
    },
  },
};

export default ru;
