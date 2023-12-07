export default {
  translation: {
    nav: {
      main: 'Перейти на главную страницу',
    },
    questions: {
      confirmChannelDeletion: 'Уверены?',
    },
    chat: {
      channels: 'Каналы',
      addChannel: 'Добавить канал',
      deleteChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      addChannelBtn: '+',
      deleteChannelBtn: 'Удалить',
      renameChannelBtn: 'Переименовать',
      switchChannelBtn: '#',
      logoutBtn:'Выйти',
    },
    form: {
      signIn: 'Войти',
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
      },
      required: 'Это обязательное поле',
      loginFailed: 'Неверные имя пользователя или пароль',
    },
    footer: {
      noAccount: 'Нет аккаунта? ',
    },
  },
};
