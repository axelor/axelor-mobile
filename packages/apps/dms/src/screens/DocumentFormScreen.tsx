/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {FormView, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {createDocument, updateDocument} from '../features/documentSlice';

const DocumentFormScreen = ({navigation, route}) => {
  const parent = route?.params?.parent;
  const document = route?.params?.document;
  const model = route?.params?.model;
  const modelId = route?.params?.modelId;
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);
  const {mobileSettings} = useSelector(state => state.appConfig);

  const creationDefaultValue = useMemo(
    () => ({
      isAttachedFileCreation: model && modelId,
      parent: parent,
    }),
    [model, modelId, parent],
  );

  const defaultValue = useMemo(
    () =>
      document && {
        ...document,
        parent: document.parent ?? {
          fileName: I18n.t('Dms_Root'),
        },
      },
    [I18n, document],
  );

  const documentAPI = useCallback(
    (_document, isCreation, dispatch) => {
      const parentId = _document.parent?.id;

      if (parentId == null) {
        _document.parent = null;
      }

      if (parentId === user.dmsRoot?.id) {
        _document.parent = user.dmsRoot;
      }

      if (parentId === mobileSettings?.defaultDmsRoot?.id) {
        _document.parent = mobileSettings?.defaultDmsRoot;
      }

      const sliceFunction = isCreation ? createDocument : updateDocument;
      dispatch((sliceFunction as any)({document: _document, model, modelId}));

      navigation.pop();
    },
    [mobileSettings?.defaultDmsRoot, model, modelId, navigation, user.dmsRoot],
  );

  return (
    <FormView
      style={styles.form}
      formKey="dms_document"
      creationDefaultValue={creationDefaultValue}
      defaultValue={defaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-document',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => document != null,
          customAction: ({objectState, dispatch}) =>
            documentAPI(objectState, true, dispatch),
        },
        {
          key: 'update-document',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => document == null,
          customAction: ({objectState, dispatch}) =>
            documentAPI(objectState, false, dispatch),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  form: {
    paddingBottom: 150,
  },
});

export default DocumentFormScreen;
