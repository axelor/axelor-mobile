/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {headerActionsProvider} from '../header';
import {CustomFieldForm} from '../components';
import {clearModelMetaCaches} from '../forms';
import {useTranslator} from '../i18n';

const JsonFieldScreen = ({route}: any) => {
  const {model, modelId} = route?.params ?? {};
  const I18n = useTranslator();

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshConfig = useCallback(() => {
    clearModelMetaCaches(model);
    setRefreshKey(_current => _current + 1);
  }, [model]);

  useEffect(() => {
    headerActionsProvider.registerModel('core_metaJsonFields_details', {
      actions: [
        {
          key: 'refreshConfig',
          order: 10,
          showInHeader: false,
          iconName: 'arrow-repeat',
          title: I18n.t('Base_Studio_RefreshConfig'),
          onPress: refreshConfig,
        },
      ],
    });
  }, [I18n, refreshConfig]);

  return (
    <CustomFieldForm
      key={refreshKey}
      model={model}
      modelId={modelId}
      readonlyButton
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
