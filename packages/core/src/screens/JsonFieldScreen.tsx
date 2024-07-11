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

import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {CustomFieldForm} from '../components';
import {
  fetchJsonFieldsOfModel,
  fetchObject,
} from '../features/metaJsonFieldSlice';
import {headerActionsProvider} from '../header';
import {useTranslator} from '../i18n';

const JsonFieldScreen = ({route}) => {
  const {model, modelId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const refresh = useCallback(() => {
    dispatch((fetchJsonFieldsOfModel as any)({modelName: model}));
    dispatch((fetchObject as any)({modelName: model, id: modelId}));
  }, [dispatch, model, modelId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    headerActionsProvider.registerModel('core_metaJsonFields_details', {
      actions: [
        {
          key: 'refreshConfig',
          order: 10,
          showInHeader: false,
          iconName: 'arrow-repeat',
          title: I18n.t('Base_Studio_RefreshConfig'),
          onPress: refresh,
        },
      ],
    });
  }, [I18n, refresh]);

  return (
    <CustomFieldForm
      model={model}
      modelId={modelId}
      readonlyButton={true}
      additionalActions={[
        {
          key: 'validateChanges',
          type: 'update',
          useDefaultAction: true,
          readonlyAfterAction: true,
        },
      ]}
    />
  );
};

export default JsonFieldScreen;
