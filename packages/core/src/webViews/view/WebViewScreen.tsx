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
import {ActivityIndicator} from 'react-native';
import {WebView} from '../../components';
import {headerActionsProvider} from '../../header';
import {useTranslator} from '../../i18n';
import {fetchWebViewById} from '../api.helpers';
import {createWebViewActionID} from '../display.helpers';

interface WebViewScreenProps {
  webViewId: number;
  hideCardBackground?: boolean;
  chartWidth?: number;
}

export const WebViewScreen = ({webViewId}: WebViewScreenProps) => {
  const I18n = useTranslator();

  const [webViewData, setWebViewData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchWebViewById({mobileWebViewId: webViewId})
      .then(response => {
        setWebViewData(response?.data?.data[0]);
      })
      .catch(() => setWebViewData({}))
      .finally(() => setLoading(false));
  }, [webViewId]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      refresh();
    }

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    headerActionsProvider.registerModel(createWebViewActionID(webViewId), {
      actions: [
        {
          key: 'refreshConfig',
          order: 10,
          showInHeader: false,
          iconName: 'arrow-repeat',
          title: I18n.t('Base_WebView_RefreshConfig'),
          onPress: refresh,
        },
      ],
    });
  }, [I18n, webViewId, refresh]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <WebView
      baseUrl={webViewData?.url}
      path={
        webViewData?.metaAction != null
          ? `#/ds/${webViewData?.metaAction?.name}`
          : ''
      }
    />
  );
};
