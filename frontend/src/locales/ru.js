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
          wrongCredentials: 'Неверные имя пользователя или пароль',
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
    },
    header: {
      buttons: {
        signout: 'Выйти',
        languages: {
          ru: 'RU',
          en: 'EN'
        },
      }
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
  },
};

export default ru;
