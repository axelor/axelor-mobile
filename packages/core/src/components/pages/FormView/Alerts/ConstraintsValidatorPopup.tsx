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
import {Alert, Text, UnorderedList} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../../i18n/hooks/use-translator';

interface ErrorItem {
  attr?: string;
  message: string;
  values?: any;
  translatable?: boolean;
}

const ConstraintsValidatorPopup = ({
  onContinue,
  errors,
}: {
  onContinue: () => void;
  errors: ErrorItem[];
}) => {
  const I18n = useTranslator();

  return (
    <Alert
      visible={true}
      title={I18n.t('Base_Error')}
      confirmButtonConfig={{width: 50, title: null, onPress: onContinue}}
      translator={I18n.t}>
      <Text>{I18n.t('Base_InvalidConstraints')}</Text>
      <UnorderedList
        data={errors}
        renderItem={({item}: {item: ErrorItem}) => (
          <Text key={`${item.attr} - ${item.message}`}>
            {item.translatable
              ? `${item.attr} ${I18n.t(item.message, item.values)}`
              : item.message}
          </Text>
        )}
      />
    </Alert>
  );
};

export default ConstraintsValidatorPopup;
