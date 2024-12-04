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

import {handlerApiCall} from '@axelor/aos-mobile-core';
import {countAttachedFiles, fetchDirectory} from '../api/document-api';

interface getActionProps {
  model: string;
  modelId: number;
  isFolderCreationAllowed: boolean;
  navigation: any;
  translator: (key: string) => string;
}

export const getAction = async ({
  model,
  modelId,
  isFolderCreationAllowed,
  navigation,
  translator,
}: getActionProps) => {
  const directory = await handlerApiCall({
    fetchFunction: fetchDirectory,
    data: {model, modelId},
    action: 'Dms_SliceAction_FetchDirectory',
    getState: () => {},
    responseOptions: {isArrayResponse: false},
  });

  const numberAttachedFiles = await handlerApiCall({
    fetchFunction: countAttachedFiles,
    data: {model, modelId},
    action: 'Dms_SliceAction_CountAttachedFiles',
    getState: () => {},
    responseOptions: {returnTotal: true},
  });

  return {
    key: 'dmsAttachedFiles',
    order: 10,
    iconName: 'paperclip',
    indicator: numberAttachedFiles,
    title: translator('Dms_AttachedFiles'),
    onPress: () =>
      navigation.navigate('AttachedFilesScreen', {
        parent: directory,
        model,
        modelId,
      }),
    showInHeader: true,
    hideIf: !directory && !isFolderCreationAllowed,
  };
};
