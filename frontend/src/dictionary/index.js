import filter from 'leo-profanity';

const profanity = [
  'еба',
  'хуею',
  'охуеть',
  'охуел',
  'охуела',
  'охуели',
  'ахуеть',
  'ахуел',
  'ахуела',
  'ахуели',
  'охуительно',
  'ахуительно',
  'охуенный',
  'ахуенный',
  'охуенен',
  'охуеннен',
  'ахуенен',
  'ахуеннен',
];

const filterProfanityWords = (message) => {
  if (/[а-яА-Я]+/.test(message)) {
    // eslint-disable-next-line
    filter.loadDictionary('ru');
    // eslint-disable-next-line
    filter.add(profanity);
    return filter.clean(message, '*', 1);
  }
  // eslint-disable-next-line
    filter.loadDictionary('en');
  return filter.clean(message, '*', 1);
};

export default filterProfanityWords;
