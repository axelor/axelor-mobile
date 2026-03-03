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

import React from 'react';
import {View} from 'react-native';
import {Text} from '../../../atoms';
import {Alert} from '../../../molecules';
import {checkNullString} from '../../../../utils';

const DetailsPopup = ({
  modalVisible,
  translator,
  closeModal,
  selectedItem,
  unit,
}: {
  modalVisible: boolean;
  translator: (translationKey: string) => string;
  closeModal: () => void;
  selectedItem: any;
  unit?: string;
}) => {
  if (selectedItem == null) {
    return null;
  }

  return (
    <Alert
      visible={modalVisible}
      translator={translator}
      title={translator('Base_Details')}
      confirmButtonConfig={{
        onPress: closeModal,
      }}>
      <View>
        <Text>{`${translator('Base_Label')}: ${
          selectedItem.label || selectedItem.title
        }`}</Text>
        <Text>{`${translator('Base_Value')}: ${selectedItem.value} ${
          checkNullString(unit) ? '' : unit
        }`}</Text>
      </View>
    </Alert>
  );
};

export default DetailsPopup;
