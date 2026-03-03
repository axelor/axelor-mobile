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

import React, {useCallback} from 'react';
import {
  useSelector,
  useDispatch,
  useTranslator,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {EditableInput, NotesCard, Text} from '@axelor/aos-mobile-ui';
import {modifyDescription} from '../../../../features/inventorySlice';
import {StyleSheet, View} from 'react-native';

const InventoryDescription = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.Inventory',
  });

  const {inventory} = useSelector(state => state.inventory);

  const handleDescriptionChange = useCallback(
    input => {
      dispatch(
        modifyDescription({
          inventoryId: inventory?.id,
          description: input.toString(),
          version: inventory?.version,
        }),
      );
    },
    [dispatch, inventory],
  );

  if (readonly) {
    return (
      <NotesCard
        title={I18n.t('Base_Description')}
        data={inventory?.description}
      />
    );
  }

  return (
    <View>
      <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
      <EditableInput
        defaultValue={inventory?.description}
        placeholder={I18n.t('Base_Description')}
        onValidate={input => handleDescriptionChange(input)}
        multiline={true}
        numberOfLines={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});

export default InventoryDescription;
