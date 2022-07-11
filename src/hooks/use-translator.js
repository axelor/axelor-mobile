import {useTranslation} from 'react-i18next';

function useTranslator() {
  const {t} = useTranslation();
  const I18n = {t: t};
  return I18n;
}

export default useTranslator;
