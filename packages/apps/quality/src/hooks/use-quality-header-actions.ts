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

import {
  headerActionsProvider,
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchControlEntryById} from '../features/controlEntrySlice';

export const useQualityHeaders = () => {
  useControlEntryListActions();
  useControlEntryDetailsActions();
  useQualityImprovementListActions();
};

const useQualityImprovementListActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.quality.db.QualityImprovement',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('quality_qualityImprovement_list', {
      model: 'com.axelor.apps.quality.db.QualityImprovement',
      options: {
        core_modelFilters: {name: 'act:quality.improvements'},
      },
      actions: [
        {
          hideIf: !canCreate,
          key: 'createNewQI',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Quality_CreateNewQI'),
          onPress: () => {
            navigation.navigate('QualityImprovementFormScreen');
          },
          showInHeader: true,
        },
      ],
    });
  }, [I18n, canCreate, navigation]);
};

const useControlEntryListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('quality_controlEntry_list', {
      model: 'com.axelor.apps.quality.db.ControlEntry',
      options: {
        core_modelFilters: {name: 'act:quality.control.entries.view'},
      },
    });
  }, []);
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
