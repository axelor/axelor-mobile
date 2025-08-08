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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {RadioSelect} from '@axelor/aos-mobile-ui';

interface PartnerTypeRadioSelectProps {
  style?: any;
  title?: string;
  defaultValue?: number;
  onChange: (value: number) => void;
  readonly?: boolean;
  showTitle?: boolean;
}

const PartnerTypeRadioSelectAux = ({
  style,
  title = 'Crm_PartnerType',
  defaultValue,
  onChange,
  readonly = false,
  showTitle = true,
}: PartnerTypeRadioSelectProps) => {
  const I18n = useTranslator();
  const {Partner} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const statusList = useMemo(
    () =>
      getSelectionItems(Partner?.partnerTypeSelect).map(_i => ({
        ..._i,
        id: `${_i.key}`,
      })),
    [Partner?.partnerTypeSelect, getSelectionItems],
  );

  const handleChange = useCallback(
    (value: string) => {
      onChange(parseInt(value, 10));
    },
    [onChange],
  );

  return (
    <RadioSelect
      style={[styles.radioSelect, style]}
      direction="row"
      question={showTitle && I18n.t(title)}
      questionStyle={styles.question}
      items={statusList}
      onChange={handleChange}
      readonly={readonly}
      defaultValue={`${defaultValue}`}
    />
  );
};

const PartnerTypeRadioSelect = (props: PartnerTypeRadioSelectProps) => {
  return <PartnerTypeRadioSelectAux {...props} />;
};

const styles = StyleSheet.create({
  radioSelect: {alignSelf: 'center', width: '90%'},
  question: {fontWeight: null, marginLeft: 10},
});

export default PartnerTypeRadioSelect;
