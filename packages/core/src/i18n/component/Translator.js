/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {useEffect, useCallback} from 'react';
import {createSelector} from '@reduxjs/toolkit';
import {fetchTranslation} from '../api/translation';
import {reduceTranslationsToI18nResources} from '../helpers/translations';
import {storage} from '../../storage/Storage';
import {i18nProvider} from '../i18n';
import {useSelector} from 'react-redux';

export const selectLanguage = createSelector(
  state => state?.user,
  userState => userState?.user?.localization?.language?.code,
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
  useEffect(() => {
    i18nProvider.i18n.on('initialized', function () {
      loadTranslationsFromStorage(i18nProvider.i18n.language);
    });
  }, []);

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
      i18nProvider.i18n.changeLanguage(language);
    }, []),
  );

  return null;
};

export function getTranslations(language) {
  return i18nProvider.i18n.getResourceBundle(language, DEFAULT_NAMESPACE);
}

function loadTranslationsFromStorage(language) {
  const translations = storage.getItem(`language.${language}`);
  if (translations != null) {
    i18nProvider.i18n.addResourceBundle(
      language,
      DEFAULT_NAMESPACE,
      translations,
    );
  }
}

function addTranslationsToI18n(language, translations) {
  i18nProvider.i18n.addResources(
    language,
    DEFAULT_NAMESPACE,
    reduceTranslationsToI18nResources(translations),
  );
}

function saveTranslationResourcesToStorage(language) {
  const translationResources = i18nProvider.i18n.getResourceBundle(
    language,
    DEFAULT_NAMESPACE,
  );
  storage.setItem(`language.${language}`, translationResources);
}

export default Translator;
