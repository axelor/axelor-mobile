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

import React, {useMemo} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Card, Text, Icon} from '../../atoms';
import Button, {ButtonProps} from '../Button/Button';
import {checkNullString} from '../../../utils';

const DEFAULT_BUTTON_WIDTH = 115;

interface ButtonConfig extends ButtonProps {
  hide?: boolean;
}
interface CancelButtonConfig extends ButtonConfig {
  showInHeader?: boolean;
  headerSize?: number;
}

interface AlertProps {
  style?: any;
  buttonsContainerStyle?: any;
  visible: boolean;
  title?: string;
  titleStyle?: any;
  noBoldTitle?: boolean;
  children: any;
  cancelButtonConfig?: CancelButtonConfig;
  confirmButtonConfig?: ButtonConfig;
  translator?: (key: string) => string;
}

const Alert = ({
  style,
  buttonsContainerStyle,
  visible = false,
  title,
  titleStyle,
  noBoldTitle = false,
  children,
  cancelButtonConfig,
  confirmButtonConfig,
  translator = key => key,
}: AlertProps) => {
  const Colors = useThemeColor();

  const _cancelButtonConfig = useMemo(() => {
    if (!cancelButtonConfig) {
      return null;
    }

    return {
      title: translator('Base_Cancel'),
      color: Colors.errorColor,
      iconName: 'x-lg',
      hide: false,
      showInHeader: false,
      headerSize: 20,
      width: DEFAULT_BUTTON_WIDTH,
      ...cancelButtonConfig,
    };
  }, [translator, Colors, cancelButtonConfig]);

  const _confirmButtonConfig = useMemo(() => {
    if (!confirmButtonConfig) {
      return null;
    }

    return {
      title: translator('Base_OK'),
      color: Colors.primaryColor,
      iconName: 'check-lg',
      hide: false,
      width: DEFAULT_BUTTON_WIDTH,
      ...confirmButtonConfig,
    };
  }, [translator, Colors, confirmButtonConfig]);

  const isCancelButtonDisplayedBottom = useMemo(() => {
    return !_cancelButtonConfig?.hide && !_cancelButtonConfig?.showInHeader;
  }, [_cancelButtonConfig]);

  const isConfirmButtonDisplayedBottom = useMemo(() => {
    return !_confirmButtonConfig?.hide;
  }, [_confirmButtonConfig]);

  return (
    <Modal
      testID="alertModal"
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={_cancelButtonConfig?.onPress}>
      <View style={styles.modalBackground} testID="modalContainer">
        <Card style={[styles.container, style]}>
          <View style={styles.headerContainer}>
            {!checkNullString(title) && (
              <Text
                writingType={noBoldTitle ? null : 'title'}
                fontSize={20}
                style={[
                  styles.title,
                  {marginHorizontal: _cancelButtonConfig?.headerSize},
                  titleStyle,
                ]}>
                {title}
              </Text>
            )}
            {!_cancelButtonConfig?.hide &&
              _cancelButtonConfig?.showInHeader && (
                <Icon
                  name="x-lg"
                  size={_cancelButtonConfig?.headerSize}
                  style={styles.headerCancelButton}
                  touchable
                  onPress={_cancelButtonConfig?.onPress}
                />
              )}
          </View>
          {children}
          {(isCancelButtonDisplayedBottom ||
            isConfirmButtonDisplayedBottom) && (
            <View style={[styles.buttonsContainer, buttonsContainerStyle]}>
              {isCancelButtonDisplayedBottom && (
                <Button
                  {..._cancelButtonConfig}
                  testID="alertCancelButton"
                  style={styles.cancelButton}
                />
              )}
              {isConfirmButtonDisplayedBottom && (
                <Button {..._confirmButtonConfig} testID="alertConfirmButton" />
              )}
            </View>
          )}
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '90%',
    maxHeight: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingRight: 20,
    paddingVertical: 15,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
  headerCancelButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    marginRight: 10,
  },
});

export default Alert;
