import {useMemo} from 'react';
import {i18nProvider} from '../i18n';

export interface TranslatorProps {
  t: (key: string) => string;
}

function useTranslator(): TranslatorProps {
  return useMemo(
    () => ({t: i18nProvider?.i18n ? i18nProvider.i18n.t : value => value}),
    [],
  );
}

export default useTranslator;
