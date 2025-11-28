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

import React, {useMemo, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useOutsideClickHandler} from '../../../hooks';
import {checkNullString} from '../../../utils';
import {Card, Text} from '../../atoms';
import Alert from '../Alert/Alert';

interface CardIndicatorProps {
  style?: any;
  textIndicationStyle?: any;
  indication?: string;
  position?: 'left' | 'right';
  children: any;
  isVisible: boolean;
  handleClose: () => void;
  space?: number;
  usePopup?: boolean;
}

const CardIndicator = ({
  style,
  textIndicationStyle,
  indication,
  position = 'right',
  children,
  isVisible,
  handleClose,
  space = Dimensions.get('window').width * 0.08,
  usePopup = false,
}: CardIndicatorProps) => {
  const wrapperRef = useRef(null);
  useOutsideClickHandler({
    wrapperRef,
    handleOutsideClick: handleClose,
    activationCondition: isVisible,
  });

  const styles = useMemo(
    () => getStyles(isVisible, position, space),
    [isVisible, position, space],
  );

  const renderIndication = () => {
    if (checkNullString(indication)) {
      return null;
    }

    return usePopup ? (
      <Alert
        visible={isVisible}
        cancelButtonConfig={{onPress: handleClose, showInHeader: true}}>
        <Text>{indication}</Text>
      </Alert>
    ) : (
      <Card style={[styles.indicationCard, textIndicationStyle]}>
        <Text>{indication}</Text>
      </Card>
    );
  };

  return (
    <View
      ref={wrapperRef}
      style={[styles.container, style]}
      testID="cardIndicatorContainer">
      {children}
      {isVisible && renderIndication()}
    </View>
  );
};

const getStyles = (isOpen, position, space) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: isOpen ? 50 : 0,
    },
    indicationCard: {
      position: 'absolute',
      paddingLeft: 10,
      paddingVertical: 10,
      paddingRight: 10,
      zIndex: 99,
      [position === 'left' ? 'right' : 'left']: space,
    },
  });

export default CardIndicator;
