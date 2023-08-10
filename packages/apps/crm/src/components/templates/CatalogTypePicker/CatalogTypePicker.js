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

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchCatalogType} from '../../../features/catalogSlice';

const CatalogTypePicker = ({
  title = 'Crm_Catalog_Type',
  defaultValue = null,
  onChange = console.log,
  readonly = false,
  required = false,
}) => {
  const dispatch = useDispatch();

  const {catalogTypeList} = useSelector(state => state.catalog);

  useEffect(() => {
    dispatch(fetchCatalogType());
  }, [dispatch]);

  return (
    <Picker
      style={styles.picker}
      styleTxt={styles.pickerTitle}
      title={title}
      defaultValue={defaultValue}
      listItems={catalogTypeList}
      labelField="name"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      disabled={readonly}
      disabledValue={defaultValue?.name}
      isValueItem={true}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    marginLeft: 3,
  },
  pickerTitle: {
    marginLeft: 5,
  },
});

export default CatalogTypePicker;
