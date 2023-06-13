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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen, FormInput, FormHtmlInput, Picker} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  UploadFileInput,
} from '@axelor/aos-mobile-core';
import {fetchCatalogType} from '../../features/catalogSlice';

const CatalogFormScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {catalogTypeList} = useSelector(state => state.catalog);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(description);
  const [type, setType] = useState(null);

  useEffect(() => {
    dispatch(fetchCatalogType());
  }, [dispatch]);

  return (
    <Screen removeSpaceOnTop={true}>
      <View style={styles.container}>
        <FormInput
          style={styles.input}
          title={I18n.t('Crm_Name')}
          onChange={setName}
          defaultValue={name}
        />
        <Picker
          style={[styles.picker, styles.marginPicker]}
          styleTxt={styles.marginPicker}
          title={I18n.t('Crm_Catalog_Type')}
          defaultValue={type}
          listItems={catalogTypeList}
          labelField="name"
          valueField="id"
          emptyValue={false}
          onValueChange={setType}
          isScrollViewContainer={true}
        />
        <FormHtmlInput
          title={I18n.t('Crm_Description')}
          onChange={setDescription}
          defaultValue={description}
        />
        <UploadFileInput />
        <UploadFileInput />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  score: {
    marginRight: '10%',
  },
  container: {
    alignItems: 'center',
  },
  containerZIndex: {
    zIndex: 40,
  },
  headerContainer: {
    flexDirection: 'row-reverse',
  },
  marginPicker: {
    marginLeft: 5,
  },
  picker: {
    width: '100%',
  },
  marginTitle: {
    marginLeft: 28,
  },
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    width: '90%',
  },
});

export default CatalogFormScreen;
