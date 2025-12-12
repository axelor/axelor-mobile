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

import {handlerApiCall} from '@axelor/aos-mobile-core';
import {countAttachedFiles, fetchDirectory} from '../api/document-api';

export const getAction = async ({
  model,
  modelId,
  options,
  canCreateObject = true,
  navigation,
  appConfig,
  translator,
}: {
  model: string;
  modelId: number;
  options: any;
  canCreateObject?: boolean;
  navigation: any;
  appConfig?: any[];
  translator: (key: string) => string;
}) => {
  const _defaultAction = {
    key: 'dmsAttachedFiles',
    order: 10,
    iconName: 'paperclip',
    title: translator('Dms_AttachedFiles'),
    showInHeader: true,
    hideIf: true,
    onPress: () => {},
  };

  if (modelId == null || model == null) return _defaultAction;

  const _dmsConfig = appConfig?.find(({sequence}) => sequence === 'app-dms');

  const directory = await handlerApiCall({
    fetchFunction: fetchDirectory,
    data: {model, modelId},
    action: 'Dms_SliceAction_FetchDirectory',
    getState: () => {},
    responseOptions: {isArrayResponse: false},
    errorOptions: {
      errorTracing: false,
      showErrorToast: false,
    },
  });

  const numberAttachedFiles = await handlerApiCall({
    fetchFunction: countAttachedFiles,
    data: {model, modelId},
    action: 'Dms_SliceAction_CountAttachedFiles',
    getState: () => {},
    responseOptions: {returnTotal: true},
    errorOptions: {
      errorTracing: false,
      showErrorToast: false,
    },
  });

  return {
    ..._defaultAction,
    indicator: numberAttachedFiles,
    onPress: () =>
      navigation.navigate('AttachedFilesScreen', {
        parent: directory,
        model,
        modelId,
        options,
      }),
    hideIf: !_dmsConfig?.isAppEnabled || (!directory && !canCreateObject),
  };
};
