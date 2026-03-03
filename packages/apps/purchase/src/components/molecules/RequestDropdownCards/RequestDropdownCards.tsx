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

import React from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {DropdownRequestCharacteristics} from '../../atoms';

const RequestDropdownCards = ({style}: {style?: any}) => {
  const I18n = useTranslator();

  return (
    <DropdownCardSwitch
      style={style}
      dropdownItems={[
        {
          key: 1,
          title: I18n.t('Purchase_Characteristics'),
          childrenComp: <DropdownRequestCharacteristics />,
        },
      ]}
    />
  );
};

export default RequestDropdownCards;
