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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  FormInput,
  FormHtmlInput,
  Picker,
  Button,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  UploadFileInput,
} from '@axelor/aos-mobile-core';
import {createCatalog, fetchCatalogType} from '../../features/catalogSlice';

const CatalogFormScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {catalogTypeList} = useSelector(state => state.catalog);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(description);
  const [type, setType] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCatalogType());
  }, [dispatch]);

  const createCatalogAPI = useCallback(() => {
    dispatch(
      createCatalog({
        name: name,
        idCatalogType: type,
        pdfFile: pdfFile,
        image: image,
        description: description,
      }),
    ).then(() => navigation.navigate('CatalogListScreen'));
  }, [dispatch, name, description, type, pdfFile, image, navigation]);

  return (
    <Screen removeSpaceOnTop={true}>
      <View style={styles.container}>
        <FormInput
          style={styles.input}
          title={I18n.t('Crm_Name')}
          onChange={setName}
          defaultValue={name}
          required={true}
        />
        <Picker
          style={styles.picker}
          styleTxt={styles.marginPicker}
          title={I18n.t('Crm_Catalog_Type')}
          defaultValue={type}
          listItems={catalogTypeList}
          labelField="name"
          valueField="id"
          emptyValue={false}
          onValueChange={setType}
          isScrollViewContainer={true}
          required={true}
        />
        <FormHtmlInput
          title={I18n.t('Crm_Description')}
          onChange={setDescription}
          defaultValue={description}
        />
        <UploadFileInput
          style={styles.input}
          returnBase64String={true}
          onUpload={setImage}
          onlyImage={true}
        />
        <UploadFileInput
          style={styles.input}
          onlyPdf={true}
          onUpload={setPdfFile}
          required={true}
        />
      </View>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={createCatalogAPI} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  marginPicker: {
    marginLeft: 5,
  },
  picker: {
    width: '100%',
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
