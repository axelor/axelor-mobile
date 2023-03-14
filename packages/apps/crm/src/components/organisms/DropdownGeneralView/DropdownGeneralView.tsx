/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {LabelText, Text} from '@axelor/aos-mobile-ui';

interface DropdownGeneralViewProps {
  assignedUser?: string;
  language?: string;
  category?: string;
  industrySector?: string;
  priceList?: string;
}

const DropdownGeneralView = ({
  assignedUser,
  language,
  category,
  industrySector,
  priceList,
}: DropdownGeneralViewProps) => {
  const I18n = useTranslator();

  if (
    !assignedUser &&
    !category &&
    !industrySector &&
    !priceList &&
    !language
  ) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoGeneralInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {assignedUser && (
        <LabelText
          title={I18n.t('Crm_AssignedTo')}
          iconName={'user-tie'}
          value={assignedUser}
        />
      )}
      {language && (
        <LabelText title={I18n.t('Crm_Language')} value={language} />
      )}
      {category && (
        <LabelText title={I18n.t('Crm_Category')} value={category} />
      )}
      {industrySector && (
        <LabelText title={I18n.t('Crm_Sector')} value={industrySector} />
      )}
      {priceList && (
        <LabelText title={I18n.t('Crm_PriceList')} value={priceList} />
      )}
    </View>
  );
};

export default DropdownGeneralView;
