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

import React, {useCallback, useEffect, useMemo} from 'react';
import {BottomBar, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  LogisticalFormGeneralInformationView,
  LogisticalFormPackagingView,
  LogisticalFormStockMoveLinesView,
} from '../../components';
import {fetchLogisticalForm} from '../../features/logisticalFormSlice';

const LogisticalFormDetailsScreen = ({navigation, route}: any) => {
  const {logisticalFormId} = route?.params ?? {};
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {LogisticalForm} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.LogisticalForm',
  });

  const {logisticalForm} = useSelector(state => state.logisticalForm);

  const loadLogisticalForm = useCallback(() => {
    dispatch((fetchLogisticalForm as any)({logisticalFormId}));
  }, [dispatch, logisticalFormId]);

  useEffect(() => {
    loadLogisticalForm();
  }, [loadLogisticalForm]);

  const bottomBarItems = useMemo(
    () => [
      {
        iconName: 'house',
        title: I18n.t('Stock_General'),
        color: Colors.secondaryColor_dark,
        viewComponent: (
          <LogisticalFormGeneralInformationView
            onRefresh={loadLogisticalForm}
          />
        ),
      },
      {
        iconName: 'diagram-3-fill',
        title: I18n.t('Stock_Packaging'),
        color: Colors.infoColor,
        viewComponent: <LogisticalFormPackagingView />,
      },
      {
        iconName: 'card-list',
        title: I18n.t('Stock_StockMoveLinesToPackage'),
        color: Colors.plannedColor,
        viewComponent: <LogisticalFormStockMoveLinesView />,
      },
      {
        iconName: 'pencil-fill',
        title: I18n.t('Stock_EditLogisticalForm'),
        color: Colors.primaryColor,
        hidden:
          readonly ||
          logisticalForm?.statusSelect ===
            LogisticalForm?.statusSelect?.Collected,
        onPress: () =>
          navigation.navigate('LogisticalFormFormScreen', {logisticalFormId}),
      },
    ],
    [
      Colors,
      I18n,
      LogisticalForm?.statusSelect?.Collected,
      loadLogisticalForm,
      logisticalForm?.statusSelect,
      logisticalFormId,
      navigation,
      readonly,
    ],
  );

  if (logisticalForm?.id !== logisticalFormId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <BottomBar items={bottomBarItems} />
    </Screen>
  );
};

export default LogisticalFormDetailsScreen;
