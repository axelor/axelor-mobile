import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

/**
 * @typedef Translator
 * @property {(key: string) => string} t
 */

/**
 * @returns {Translator}
 */
function useTranslator() {
  const {t} = useTranslation();
  return useMemo(() => ({t: t}), [t]);
}

export default useTranslator;
