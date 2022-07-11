import {createSelector} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import i18n from '@/i18n';
import {useSelector, useDispatch} from 'react-redux';
import {fetchActiveUser} from '@/modules/auth/features/userSlice';
import {fetchTranslation} from '@/api/translation';
import {reduceTranslationsToI18nResources} from './translation-helpers';

const selectLanguage = createSelector(
  state => state?.user,
  userState => userState.user.language,
);

const DEFAULT_NAMESPACE = 'translation';

const Translator = () => {
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveUser());
  }, [dispatch]);

  useEffect(() => {
    if (language) {
      fetchTranslation(language).then(translations => {
        if (translations) {
          i18n.addResources(
            language,
            DEFAULT_NAMESPACE,
            reduceTranslationsToI18nResources(translations),
          );
        }
      });
    }
  }, [language]);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return null;
};

export default Translator;
