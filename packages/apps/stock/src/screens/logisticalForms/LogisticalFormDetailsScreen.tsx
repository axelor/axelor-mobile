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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {LogisticalFormGeneralInformationView} from '../../components';
import {fetchLogisticalForm} from '../../features/logisticalFormSlice';

const LogisticalFormDetailsScreen = ({route}: any) => {
  const {logisticalFormId} = route?.params ?? {};
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

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
    ],
    [Colors, I18n, loadLogisticalForm],
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
