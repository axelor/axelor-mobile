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

import React, {useEffect, useState} from 'react';
import {
  handlerApiCall,
  headerActionsProvider,
  useIsFocused,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Alert, Text} from '@axelor/aos-mobile-ui';
import {fetchDirectory} from '../api/document-api';
import {DocumentList} from '../components';

const AttachedFilesScreen = ({navigation, route}) => {
  const {parent: _parent, model, modelId, options} = route?.params ?? {};
  const I18n = useTranslator();
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [parent, setParent] = useState(_parent);

  useEffect(() => {
    !parent && setIsVisible(true);
  }, [parent]);

  useEffect(() => {
    if (isFocused && parent == null) {
      handlerApiCall({
        fetchFunction: fetchDirectory,
        data: {model, modelId},
        action: 'Dms_SliceAction_FetchDirectory',
        getState: () => {},
        responseOptions: {isArrayResponse: false},
        errorOptions: {
          errorTracing: false,
          showErrorToast: false,
        },
      }).then(setParent);
    }
  }, [isFocused, model, modelId, parent]);

  useEffect(() => {
    if (options?.screenTitle != null) {
      headerActionsProvider.registerModel('dms_attachedFiles_tree', {
        headerTitle: options?.screenTitle,
      });
    }
  }, [options]);

  return (
    <>
      {!isVisible && (
        <DocumentList defaultParent={parent} isAttachedFilesList />
      )}
      <Alert
        visible={isVisible}
        title={I18n.t('Dms_NoAttachedFiles')}
        cancelButtonConfig={{
          title: I18n.t('Base_No'),
          onPress: () => {
            setIsVisible(false);
            navigation.goBack();
          },
        }}
        confirmButtonConfig={{
          title: I18n.t('Base_Yes'),
          onPress: () => {
            setIsVisible(false);
            navigation.navigate('DocumentFormScreen', {
              model,
              modelId,
            });
          },
        }}
        translator={I18n.t}>
        <Text>{I18n.t('Dms_DoYouWantToAddFile')}</Text>
      </Alert>
    </>
  );
};

export default AttachedFilesScreen;
