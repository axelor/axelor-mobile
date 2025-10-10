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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from '../redux/hooks';
import {useTranslator} from '../i18n';
import {useOnline} from '../features/onlineSlice';
import {useNavigation} from '../hooks/use-navigation';
import {fetchJsonFieldsOfModel} from '../forms';
import {
  fetchModel,
  getNetInfo,
  fetchActionPrint,
  fetchDefaultFilters,
  fetchMetaFilters,
} from '../api';
import {PopupFilters, PopupPrintTemplate} from '../components';
import {headerActionsProvider} from './HeaderActionsProvider';

export const useBasicActions = () => {
  const connectionInterval = useRef<number>(null);

  const [isConnected, setIsConnected] = useState(true);

  const checkInternetConnection = useCallback(async () => {
    const {isConnected: _isConnected} = await getNetInfo();
    setIsConnected(_isConnected);
  }, []);

  useEffect(() => {
    connectionInterval.current = setInterval(checkInternetConnection, 5000);

    return () => clearInterval(connectionInterval.current);
  }, [checkInternetConnection]);

  useFilterGenericAction();
  useBarcodeGenericAction();
  useJsonFieldsGenericAction(isConnected);
  usePrintingGenericAction(isConnected);
};

const useFilterGenericAction = () => {
  const I18n = useTranslator();

  const {userId} = useSelector(state => state.auth);

  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'core_modelFilters',
      async ({model, modelId, options}) => {
        const _defaultAction = {
          key: 'savedFilters',
          order: 50,
          iconName: 'filter',
          title: I18n.t('Base_ShowSavedFilter'),
          showInHeader: true,
          hideIf: true,
          onPress: () => {},
        };

        if (modelId != null || model == null) return _defaultAction;

        const {savedFilters, userFilters} = await fetchDefaultFilters({
          modelName: model,
          options,
        })
          .then(res => res?.data?.data)
          .then(async res => {
            const _filters = (res?.view?.filters ?? []).map((_f: any) => ({
              ..._f,
              id: _f.name,
            }));
            const filterName = options?.name ?? res?.view?.name;
            let _userFilters = [];

            if (filterName) {
              _userFilters = await fetchMetaFilters({filterName, userId})
                .then(metaRes => metaRes?.data?.data ?? [])
                .catch(() => []);
            }

            return {savedFilters: _filters, userFilters: _userFilters};
          })
          .catch(() => ({savedFilters: [], userFilters: []}));

        return {
          ..._defaultAction,
          hideIf: savedFilters?.length === 0 && userFilters?.length === 0,
          onPress: () => setAlertVisible(true),
          customComponent: (
            <PopupFilters
              visible={alertVisible}
              onClose={() => setAlertVisible(false)}
              savedFilters={savedFilters}
              userFilters={userFilters}
              model={model}
            />
          ),
        };
      },
    );
  }, [I18n, alertVisible, userId]);
};

const useJsonFieldsGenericAction = (isConnected: boolean) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const online = useOnline();

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'core_modelJsonFields',
      async ({model, modelId, options}) => {
        const _defaultAction = {
          key: 'metaJsonFields',
          order: 30,
          title: I18n.t('Base_MetaJsonFields'),
          iconName: 'layout-text-window-reverse',
          showInHeader: true,
          hideIf: true,
          onPress: () => {},
        };

        if (modelId == null || model == null) return _defaultAction;

        const canDisplay = await fetchJsonFieldsOfModel({modelName: model})
          .catch(() => false)
          .then(res => res?.data?.total > 0);

        return {
          ..._defaultAction,
          hideIf:
            !canDisplay ||
            options?.disableJsonFields ||
            !online.isEnabled ||
            !isConnected,
          onPress: () =>
            navigation.navigate('JsonFieldScreen', {model, modelId}),
        };
      },
    );
  }, [I18n, isConnected, navigation, online.isEnabled]);
};

const useBarcodeGenericAction = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'core_modelBarcode',
      async ({model, modelId, options}) => {
        const _defaultAction = {
          key: 'barcode',
          order: 30,
          title: I18n.t('Base_Barcode'),
          iconName: 'qr-code',
          showInHeader: true,
          hideIf: true,
          onPress: () => {},
        };

        if (modelId == null || model == null) return _defaultAction;

        const barcodeFieldname = options?.barcodeFieldname ?? 'barCode';

        const hideAction = await fetchModel({model, modelId})
          .then(object => object?.[barcodeFieldname] == null)
          .catch(() => true);

        return {
          ..._defaultAction,
          hideIf: hideAction,
          onPress: () =>
            navigation.navigate('BarcodeDisplayScreen', {
              model,
              modelId,
              barcodeFieldname,
            }),
        };
      },
    );
  }, [I18n, navigation]);
};

const usePrintingGenericAction = (isConnected: boolean) => {
  const I18n = useTranslator();
  const online = useOnline();

  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'core_modelPrinting',
      async ({model, modelId, options}) => {
        const _defaultAction = {
          key: 'printTemplate',
          order: 40,
          iconName: 'printer-fill',
          title: I18n.t('Base_Print'),
          showInHeader: true,
          hideIf: true,
          onPress: () => {},
        };

        if (modelId == null || model == null) return _defaultAction;

        const {templateSet, fileName}: any = await fetchActionPrint({
          model,
          id: modelId,
        });

        return {
          ..._defaultAction,
          hideIf:
            options?.disablePrint ||
            (templateSet == null && fileName == null) ||
            !online.isEnabled ||
            !isConnected,
          onPress: () => setAlertVisible(true),
          customComponent: (
            <PopupPrintTemplate
              visible={alertVisible}
              onClose={() => setAlertVisible(false)}
              model={model}
              modelId={modelId}
              templateSet={templateSet}
              fileName={fileName}
            />
          ),
        };
      },
    );
  }, [I18n, alertVisible, isConnected, online.isEnabled]);
};
