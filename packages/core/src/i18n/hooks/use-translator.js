import {useMemo} from 'react';
import {i18nProvider} from '../i18n';

/**
 * @typedef Translator
 * @property {(key: string) => string} t
 */

/**
 * @returns {Translator}
 */
function useTranslator() {
  return useMemo(
    () => ({t: i18nProvider?.i18n ? i18nProvider.i18n.t : value => value}),
    [],
  );
}

export default useTranslator;
