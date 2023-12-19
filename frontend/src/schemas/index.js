import { setLocale } from 'yup';
import * as Yup from 'yup';

export const useChannelNameSchema = (names, t) => {
  // eslint-disable-next-line
  setLocale({
    mixed: {
      notOneOf: () => t('errors.modalErrors.notOneOf'),
      required: () => t('errors.modalErrors.required'),
    },
    string: {
      min: () => t('errors.modalErrors.min'),
      max: () => t('errors.modalErrors.max'),
    },
  });

  return Yup.object().shape({
    name: Yup
      .string()
      .required()
      .min(3)
      .max(20)
      .notOneOf(names),
  });
};

export const useRegistrationFormSchema = (t) => {
  // eslint-disable-next-line
  setLocale({
    mixed: {
      oneOf: () => t('errors.registrationErrors.oneOf'),
      required: () => t('errors.required'),
    },
    string: {
      min: () => t('errors.registrationErrors.min'),
      max: () => t('errors.registrationErrors.max'),
    },
  });

  return Yup.object().shape({
    username: Yup.string().required().min(3).max(20),
    password: Yup.string().required().min(6, t('errors.registrationErrors.password.min')),
    passwordConfirmation: Yup.string().required(t('errors.registrationErrors.oneOf')).oneOf([Yup.ref('password')]),
  });
};
