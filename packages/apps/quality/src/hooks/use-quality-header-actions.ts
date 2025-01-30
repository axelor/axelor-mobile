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

import {
  headerActionsProvider,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchControlEntryById} from '../features/controlEntrySlice';

export const useQualityHeaders = () => {
  useControlEntryDetailsActions();
};

const useControlEntryDetailsActions = () => {
  const Colors = useThemeColor();
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
          },
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, controlEntry?.id, dispatch]);
};
