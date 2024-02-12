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

import {
  headerActionsProvider,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchControlEntryById} from '../features/controlEntrySlice';
import {searchControlEntrySample} from '../features/controlEntrySampleSlice';

const useControlEntryListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('quality_controlEntry_list', {
      actions: [
        {
          key: 'newControlEntry',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Quality_NewControlEntry'),
          iconColor: Colors.primaryColor.background,
          onPress: () => console.log(I18n.t('Quality_NewControlEntry')),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation]);
};

const useControlEntryDetailsActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);

  useEffect(() => {
    headerActionsProvider.registerModel('quality_controlEntry_details', {
      actions: [
        {
          key: 'refreshControlEntry',
          order: 10,
          iconName: 'arrow-repeat',
          title: I18n.t('Quality_RefreshControlEntry'),
          iconColor: Colors.primaryColor.background,
          onPress: () => {
            dispatch(
              (fetchControlEntryById as any)({
                controlEntryId: controlEntry?.id,
              }),
            );
            dispatch(
              (searchControlEntrySample as any)({
                page: 0,
                controlEntryId: controlEntry?.id,
              }),
            );
          },
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, controlEntry?.id, dispatch, navigation]);
};

export const useQualityHeaders = () => {
  useControlEntryListActions();
  useControlEntryDetailsActions();
};
