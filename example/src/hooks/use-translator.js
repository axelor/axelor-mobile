import {useTranslator as useCoreTranslator} from '@aos-mobile/core';

/**
 * @typedef Translator
 * @property {(key: string) => string} t
 */

/**
 * @returns {Translator}
 */
function useTranslator() {
  const I18n = useCoreTranslator();
  return I18n;
}

export default useTranslator;
