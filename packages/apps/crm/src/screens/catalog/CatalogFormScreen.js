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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen, FormInput, Picker, Button} from '@axelor/aos-mobile-ui';
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
  const [description, setDescription] = useState(null);
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
    );

    navigation.navigate('CatalogListScreen');
  }, [dispatch, name, description, type, pdfFile, image, navigation]);

  const disabled = useMemo(() => {
    return name == null || type == null || pdfFile == null;
  }, [name, type, pdfFile]);

  return (
    <Screen>
      <View style={styles.container}>
        <FormInput
          style={styles.input}
          title={I18n.t('Crm_Name')}
          onChange={setName}
          defaultValue={name}
          required={true}
        />
        <Picker
          style={styles.input}
          title={I18n.t('Crm_Catalog_Type')}
          defaultValue={type}
          listItems={catalogTypeList}
          labelField="name"
          valueField="id"
          emptyValue={false}
          onValueChange={setType}
          required={true}
        />
        <FormInput
          style={styles.input}
          title={I18n.t('Crm_Description')}
          onChange={setDescription}
          defaultValue={description}
          multiline={true}
          adjustHeightWithLines={true}
        />
        <UploadFileInput
          style={styles.input}
          returnBase64String={true}
          onUpload={setImage}
          documentTypesAllowed="images"
          title={I18n.t('Crm_Image')}
        />
        <UploadFileInput
          style={styles.input}
          documentTypesAllowed="pdf"
          onUpload={setPdfFile}
          required={true}
          title={I18n.t('Crm_PdfFile')}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          title={I18n.t('Base_Save')}
          onPress={createCatalogAPI}
          disabled={disabled}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
