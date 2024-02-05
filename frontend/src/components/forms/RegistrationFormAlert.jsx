import { Alert } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

const RegistrationFormAlert = () => {
  const { t } = useTranslation();

  return (
    <Alert variant="danger" dismissible>
      {t('errors.registrationErrors.registrationFailed')}
    </Alert>
  );
};

export default RegistrationFormAlert;
