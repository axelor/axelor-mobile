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

import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslator} from '../i18n';
import {checkNullString} from '../utils';
import {fetchModel} from '../api/model-api';
import {useOnline} from '../features/onlineSlice';
import {getNetInfo} from '../api/net-info-utils';
import {fetchJsonFieldsOfModel} from '../forms';
import {useIsFocused} from '../hooks/use-navigation';
import {fetchActionPrint} from '../api/print-template-api';
import {fetchDefaultFilters, fetchMetaFilters} from '../api/aop-filter-api';
import {filterProvider} from './FilterProvider';

export const useBasicActions = ({
  model,
  modelId,
  disablePrint,
  disableJsonFields = false,
  barcodeFieldname = 'barCode',
}) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const online = useOnline();
  const connectionInterval = useRef();
  const isFocused = useIsFocused();

  const {userId} = useSelector(state => state.auth);

  const [disableBarcode, setDisableBarcode] = useState(true);
  const [disableCustomView, setDisableCustomView] = useState(true);
  const [disablePrinting, setDisablePrinting] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isTemplateSelectorVisible, setTemplateSelectorVisible] =
    useState(false);
  const [areSavedFiltersVisible, setAreSavedFiltersVisible] = useState(false);
  const [savedFilters, setSavedFilters] = useState([]);
  const [userFilters, setUserFilters] = useState([]);

  const modelConfigured = useMemo(
    () => !checkNullString(model) && modelId != null,
    [model, modelId],
  );

  const closePrintTemplateSelector = useCallback(() => {
    setTemplateSelectorVisible(false);
  }, []);

  const closeSavedFiltersPopup = useCallback(() => {
    setAreSavedFiltersVisible(false);
  }, []);

  useEffect(() => {
    fetchModel({model, modelId})
      .catch(() => {
        setDisableBarcode(true);
      })
      .then(object => setDisableBarcode(object?.[barcodeFieldname] == null));
  }, [barcodeFieldname, model, modelId]);

  useEffect(() => {
    fetchJsonFieldsOfModel({modelName: model})
      .catch(() => setDisableCustomView(true))
      .then(res => {
        setDisableCustomView(res?.data?.total == null || res.data.total === 0);
      });
  }, [model]);

  useEffect(() => {
    if (model && modelId) {
      fetchActionPrint({model, id: modelId})
        .catch(() => setDisablePrinting(true))
        .then(({templateSet, fileName}) => {
          setDisablePrinting(templateSet == null && fileName == null);
        });
    }
  }, [model, modelId]);

  const checkInternetConnection = useCallback(async () => {
    const {isConnected: _isConnected} = await getNetInfo();
    setIsConnected(_isConnected);
  }, []);

  useEffect(() => {
    if (isFocused) {
      connectionInterval.current = setInterval(checkInternetConnection, 2000);
    } else {
      clearInterval(connectionInterval.current);
    }
    return () => {
      clearInterval(connectionInterval.current);
    };
  }, [checkInternetConnection, isFocused]);

  useEffect(() => {
    if (!model) return;
    filterProvider.setActiveFilter();
    fetchDefaultFilters({modelName: model})
      .then(res => {
        const _filters = res?.data?.data?.view?.filters || [];
        const viewName = res?.data?.data?.view?.name;
        setSavedFilters(
          _filters.map(_f => ({..._f, id: _f.name, name: _f.title})),
        );

        if (viewName) {
          fetchMetaFilters({filterName: viewName, userId})
            .then(metaRes => {
              const _userFilters = metaRes?.data?.data || [];
              setUserFilters(_userFilters);
            })
            .catch(() => setUserFilters([]));
        }
      })
      .catch(() => setSavedFilters([]));
  }, [model, userId]);

  const savedFiltersAction = useMemo(() => {
    return {
      key: 'savedFilters',
      order: 50,
      iconName: 'filter',
      title: I18n.t('Base_ShowSavedFilter'),
      onPress: () => {
        setAreSavedFiltersVisible(true);
      },
      hideIf:
        modelId != null ||
        model == null ||
        ((savedFilters == null || savedFilters?.length === 0) &&
          (userFilters == null || userFilters?.length === 0)),
      showInHeader: true,
    };
  }, [I18n, model, modelId, savedFilters, userFilters]);

  const barcodeAction = useMemo(() => {
    return {
      key: 'barcode',
      order: 30,
      title: I18n.t('Base_Barcode'),
      iconName: 'qr-code',
      hideIf: disableBarcode,
      onPress: () =>
        navigation.navigate('BarcodeDisplayScreen', {
          model,
          modelId,
          barcodeFieldname,
        }),
      showInHeader: true,
    };
  }, [I18n, barcodeFieldname, disableBarcode, model, modelId, navigation]);

  const jsonFieldsAction = useMemo(() => {
    return {
      key: 'metaJsonFields',
      order: 30,
      title: I18n.t('Base_MetaJsonFields'),
      iconName: 'layout-text-window-reverse',
      hideIf:
        disableCustomView ||
        disableJsonFields ||
        !online.isEnabled ||
        !isConnected,
      onPress: () =>
        navigation.navigate('JsonFieldScreen', {
          model,
          modelId,
        }),
      showInHeader: true,
    };
  }, [
    I18n,
    disableCustomView,
    disableJsonFields,
    online.isEnabled,
    isConnected,
    navigation,
    model,
    modelId,
  ]);

  const printAction = useMemo(() => {
    return {
      key: 'printTemplate',
      order: 40,
      onPress: () => {
        setTemplateSelectorVisible(true);
      },
      iconName: 'printer-fill',
      hideIf:
        disablePrint || disablePrinting || !online.isEnabled || !isConnected,
      title: I18n.t('Base_Print'),
      showInHeader: true,
    };
  }, [I18n, disablePrint, disablePrinting, isConnected, online.isEnabled]);

  return useMemo(() => {
    return {
      isTemplateSelectorVisible,
      areSavedFiltersVisible,
      closePrintTemplateSelector,
      closeSavedFiltersPopup,
      savedFilters,
      userFilters,
      ...(modelConfigured
        ? {
            printAction,
            barcodeAction,
            jsonFieldsAction,
            savedFiltersAction,
          }
        : {
            printAction: {key: 'printTemplate', hideIf: true},
            barcodeAction: {key: 'barcode', hideIf: true},
            jsonFieldsAction: {key: 'metaJsonFields', hideIf: true},
            savedFiltersAction: {key: 'savedFilters', hideIf: true},
          }),
    };
  }, [
    isTemplateSelectorVisible,
    areSavedFiltersVisible,
    closePrintTemplateSelector,
    closeSavedFiltersPopup,
    savedFilters,
    userFilters,
    modelConfigured,
    printAction,
    barcodeAction,
    jsonFieldsAction,
    savedFiltersAction,
  ]);
};
