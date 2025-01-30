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
