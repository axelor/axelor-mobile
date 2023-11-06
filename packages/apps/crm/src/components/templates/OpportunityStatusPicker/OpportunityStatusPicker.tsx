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
import {StyleSheet} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {FormInput, Picker} from '@axelor/aos-mobile-ui';

const OpportunityStatusPicker = ({
  style = null,
  title = 'Crm_Opportunity_Status',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const {opportunityStatusList} = useSelector(
    (state: any) => state.opportunity,
  );

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={title}
        readOnly={true}
        defaultValue={defaultValue?.name}
      />
    );
  }

  return (
    <Picker
      style={styles.marginPicker}
      styleTxt={styles.marginTitle}
      title={title}
      defaultValue={defaultValue}
      listItems={opportunityStatusList}
      labelField="name"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      isValueItem={true}
      isScrollViewContainer={true}
    />
  );
};

const styles = StyleSheet.create({
  marginPicker: {
    marginLeft: 5,
  },
  marginTitle: {
    marginLeft: 5,
  },
});

export default OpportunityStatusPicker;
