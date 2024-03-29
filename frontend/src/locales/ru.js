export default {
  translation: {
    nav: {
      main: 'Перейти на главную страницу',
    },
    toasts: {
      channelCreated: 'Канал создан',
      channelDeleted: 'Канал удален',
      channelRenamed: 'Канал переименован',
    },
    questions: {
      confirmChannelDeletion: 'Уверены?',
    },
    chat: {
      channels: 'Каналы',
      channelName: 'Имя канала',
      addChannel: 'Добавить канал',
      deleteChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      addChannelBtn: '+',
      deleteChannelBtn: 'Удалить',
      renameChannelBtn: 'Переименовать',
      switchChannelBtn: '#',
      logoutBtn: 'Выйти',
    },
    form: {
      signIn: 'Вход',
      signInBtn: 'Войти',
      signUp: 'Регистрация',
      signUpBtn: 'Зарегистрироваться',
      sendBtn: 'Отправить',
      cancelBtn: 'Отменить',
      deleteBtn: 'Удалить',
      fields: {
        nickname: 'Ваш ник',
        username: 'Имя пользователя',
        password: 'Пароль',
        passwordConfirmation: 'Подтвердите пароль',
      },
      messages: {
        newMessage: 'Новое сообщение',
        enterMessage: 'Введите сообщение...',
        messagesCount: {
          count_one: '{{count}} сообщение',
          count_few: '{{count}} сообщения',
          count_many: '{{count}} сообщений',
        },
      },
    },
    errors: {
      routeErrors: {
        404: 'ОШИБКА 404',
        notFound: 'К сожалению, страница не найдена :(',
      },
      modalErrors: {
        notOneOf: 'Канал с таким именем уже существует',
        required: 'Введите имя канала',
        min: 'Имя канала должно содержать минимум 3 символа',
        max: 'Максимальная длина имени канала - 20 символов',
      },
      registrationErrors: {
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
        oneOf: 'Пароли должны совпадать',
        registrationFailed: 'Такой пользователь уже существует',
        password: {
          min: 'Не менее 6 символов',
        },
      },
      required: 'Это обязательное поле',
      loginFailed: 'Неверные имя пользователя или пароль',
    },
    footer: {
      noAccount: 'Нет аккаунта? ',
    },
  },
};
