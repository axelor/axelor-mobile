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
import {StyleSheet, View} from 'react-native';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

interface ContactInfoProps {
  displayDeleteButton: boolean;
  onDeleteButtonPress: () => void;
  onConfirmButtonPress: (data: Object) => void;
}

interface ContactInfoFormButtonsProps {
  defaultValue?: ContactInfoProps;
  objectState?: any;
}

const ContactInfoFormButtonsAux = ({
  defaultValue,
  objectState,
}: ContactInfoFormButtonsProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      {defaultValue.displayDeleteButton && (
        <Button
          style={styles.leftButton}
          iconName="trash-fill"
          width={50}
          color={Colors.errorColor}
          onPress={defaultValue.onDeleteButtonPress}
        />
      )}
      <Button
        iconName="check-lg"
        width={50}
        color={Colors.successColor}
        onPress={() =>
          defaultValue.onConfirmButtonPress({
            streetName: objectState.streetName,
            city: objectState.city,
            country: objectState.country,
            zip: objectState.zip,
            mobilePhone: objectState.mobilePhone,
            fixedPhone: objectState.fixedPhone,
            email: objectState.email,
            webSite: objectState.webSite,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '5%',
    marginTop: 10,
  },
  leftButton: {
    marginRight: 10,
  },
});

const ContactInfoFormButtons = ({
  defaultValue = null,
  objectState,
}: ContactInfoFormButtonsProps) => {
  return (
    <ContactInfoFormButtonsAux
      defaultValue={defaultValue}
      objectState={objectState}
    />
  );
};

export default ContactInfoFormButtons;
