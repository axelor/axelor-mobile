import {useTranslator} from '@axelor/aos-mobile-core';
import {useMemo} from 'react';

export const useCivilityList = () => {
  const I18n = useTranslator();

  return useMemo(
    () => ({
      civilityList: [
        {id: 1, name: I18n.t('Crm_Civility_M')},
        {id: 2, name: I18n.t('Crm_Civility_Mme')},
        {id: 3, name: I18n.t('Crm_Civility_Dr')},
        {id: 4, name: I18n.t('Crm_Civility_Prof')},
      ],
    }),
    [I18n],
  );
};
