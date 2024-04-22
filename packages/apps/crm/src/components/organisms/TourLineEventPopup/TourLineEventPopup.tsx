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

import React, {useCallback, useState} from 'react';
import {Alert, LabelText, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useNavigation,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {EventPartnerPicker} from '../../templates';
import {updateTourLine} from '../../../features/tourLineSlice';

interface TourLineEventPopupProps {
  style?: any;
  visible: boolean;
  partner: any;
  onClose: any;
  version: number;
  id: number;
  isValidated: boolean;
  tourId: number;
}

const TourLineEventPopup = ({
  visible,
  partner,
  onClose,
  version,
  id,
  tourId,
  isValidated,
}: TourLineEventPopupProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [eventTourLine, setEventTourLine] = useState(null);

  const updateTourLineEventAPI = useCallback(() => {
    dispatch(
      (updateTourLine as any)({
        event: eventTourLine,
        tourLineId: id,
        tourLineVersion: version,
        tourId: tourId,
        isValidated: isValidated,
      }),
    );
  }, [dispatch, eventTourLine, id, version, tourId, isValidated]);

  return (
    <Alert
      visible={visible}
      cancelButtonConfig={{onPress: onClose}}
      translator={I18n.t}
      confirmButtonConfig={{
        title: I18n.t('Base_Add'),
        onPress: updateTourLineEventAPI,
        disabled: eventTourLine == null,
      }}>
      <View style={styles.container}>
        <EventPartnerPicker partner={partner} onChange={setEventTourLine} />
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('EventFormScreen', {
              client: partner,
            });
          }}>
          <LabelText
            style={styles.labelText}
            iconName="plus-lg"
            color={Colors.primaryColor.background}
            title={I18n.t('Crm_CreateEvent')}
            size={16}
          />
        </TouchableOpacity>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  labelText: {
    marginVertical: 5,
  },
});

export default TourLineEventPopup;
