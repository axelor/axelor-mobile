import {createSelector} from '@reduxjs/toolkit';
import {useEffect, useCallback} from 'react';
import i18n from '@/i18n';
import {useSelector} from 'react-redux';
import {fetchTranslation} from '@/api/translation';
import {reduceTranslationsToI18nResources} from './translation-helpers';
import {storage} from '@aos-mobile/core';

export const selectLanguage = createSelector(
  state => state?.user,
  userState => userState.user.language,
);

const DEFAULT_NAMESPACE = 'translation';

const useLanguageEffect = callback => {
  const language = useSelector(selectLanguage);

  useEffect(() => {
    if (language) {
      callback(language);
    }
  }, [language, callback]);
};

const Translator = () => {
  useLanguageEffect(
    useCallback(language => {
      loadTranslationsFromStorage(language);
    }, []),
  );

  useLanguageEffect(
    useCallback(language => {
      fetchTranslation(language).then(translations => {
        if (translations) {
          addTranslationsToI18n(language, translations);
          saveTranslationResourcesToStorage(language);
        }
      });
    }, []),
  );

  useLanguageEffect(
    useCallback(language => {
      i18n.changeLanguage(language);
    }, []),
  );

  return null;
};

export function getTranslations(language) {
  return i18n.getResourceBundle(language, DEFAULT_NAMESPACE);
}

function loadTranslationsFromStorage(language) {
  const translations = storage.getItem(`language.${language}`);
  if (translations != null) {
    i18n.addResourceBundle(language, DEFAULT_NAMESPACE, translations);
  }
}

function addTranslationsToI18n(language, translations) {
  i18n.addResources(
    language,
    DEFAULT_NAMESPACE,
    reduceTranslationsToI18nResources(translations),
  );
}

function saveTranslationResourcesToStorage(language) {
  const translationResources = i18n.getResourceBundle(
    language,
    DEFAULT_NAMESPACE,
  );
  storage.setItem(`language.${language}`, translationResources);
}

export default Translator;
