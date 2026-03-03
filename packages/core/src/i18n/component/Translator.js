/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  userState => ({
    localization: userState?.user?.localization?.code,
    language: userState?.user?.localization?.language?.code,
  }),
);

const DEFAULT_NAMESPACE = 'translation';

const useLanguageEffect = callback => {
  const {localization} = useSelector(selectLanguage);

  useEffect(() => {
    if (localization) {
      callback({localization});
    }
  }, [callback, localization]);
};

const Translator = () => {
  useEffect(() => {
    i18nProvider.i18n.on('initialized', function () {
      loadTranslationsFromStorage(i18nProvider.i18n.language);
    });
  }, []);

  useLanguageEffect(
    useCallback(({localization}) => {
      loadTranslationsFromStorage(localization);
    }, []),
  );

  useLanguageEffect(
    useCallback(({localization}) => {
      fetchTranslation(localization).then(translations => {
        if (translations) {
          addTranslationsToI18n(localization, translations);
          saveTranslationResourcesToStorage(localization);
        }
      });
    }, []),
  );

  useLanguageEffect(
    useCallback(({localization}) => {
      i18nProvider.i18n.changeLanguage(localization);
    }, []),
  );

  return null;
};

export function getTranslations(localization) {
  const language = localization?.split('_')?.[0];

  const _getTranslations = lng =>
    i18nProvider.i18n.getResourceBundle(lng, DEFAULT_NAMESPACE);

  const localizationTranslations = _getTranslations(localization);
  const languageTranslations = _getTranslations(language);

  return {...languageTranslations, ...localizationTranslations};
}

function loadTranslationsFromStorage(localization) {
  const translations = storage.getItem(`language.${localization}`);

  if (translations != null) {
    i18nProvider.i18n.addResourceBundle(
      localization,
      DEFAULT_NAMESPACE,
      translations,
    );
  }
}

function addTranslationsToI18n(localization, translations) {
  i18nProvider.i18n.addResources(
    localization,
    DEFAULT_NAMESPACE,
    reduceTranslationsToI18nResources(translations),
  );
}

function saveTranslationResourcesToStorage(localization) {
  const translationResources = i18nProvider.i18n.getResourceBundle(
    localization,
    DEFAULT_NAMESPACE,
  );

  if (translationResources != null) {
    storage.setItem(`language.${localization}`, translationResources);
  }
}

export default Translator;
