/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card, Text, Icon} from '../../atoms';
import Button, {ButtonProps} from '../Button/Button';

interface ButtonConfig extends ButtonProps {
  hide?: boolean;
}
interface CancelButtonConfig extends ButtonConfig {
  showInHeader?: boolean;
}

interface PopUpProps {
  style?: any;
  visible: boolean;
  title?: string;
  children: any;
  cancelButtonConfig?: CancelButtonConfig;
  confirmButtonConfig?: ButtonConfig;
  translator?: (key: string) => string;
}

const PopUp = ({
  style,
  visible,
  title,
  children,
  cancelButtonConfig,
  confirmButtonConfig,
  translator,
}: PopUpProps) => {
  const Colors = useThemeColor();

  const _cancelButtonConfig = useMemo(() => {
    if (!cancelButtonConfig) {
      return null;
    }

    return {
      ...cancelButtonConfig,
      title: cancelButtonConfig.title ?? translator('Base_Cancel'),
      color: cancelButtonConfig.color ?? Colors.errorColor,
      iconName: cancelButtonConfig.iconName ?? 'times',
      hide: cancelButtonConfig.hide ?? false,
      showInHeader: cancelButtonConfig.showInHeader ?? false,
      width: cancelButtonConfig.width ?? 115,
    };
  }, [cancelButtonConfig, translator, Colors]);

  const _confirmButtonConfig = useMemo(() => {
    if (!confirmButtonConfig) {
      return null;
    }

    return {
      ...confirmButtonConfig,
      title: confirmButtonConfig.title ?? translator('Base_Ok'),
      color: confirmButtonConfig.color ?? Colors.primaryColor,
      iconName: confirmButtonConfig.iconName ?? 'check',
      hide: confirmButtonConfig.hide ?? false,
      width: confirmButtonConfig.width ?? 115,
    };
  }, [confirmButtonConfig, translator, Colors]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={_cancelButtonConfig?.onPress}>
      <View style={styles.modalBackground}>
        <Card style={[styles.container, style]}>
          <View style={styles.headerContainer}>
            {!!title && (
              <Text writingType="title" fontSize={20}>
                {translator ? translator(title) : title}
              </Text>
            )}
            {!_cancelButtonConfig?.hide &&
              _cancelButtonConfig?.showInHeader && (
                <Icon
                  name="times"
                  size={20}
                  style={styles.headerCancelButton}
                  touchable
                  onPress={_cancelButtonConfig?.onPress}
                />
              )}
          </View>
          {children}
          <View style={styles.buttonsContainer}>
            {!_cancelButtonConfig?.hide &&
              !_cancelButtonConfig?.showInHeader && (
                <Button {..._cancelButtonConfig} style={styles.cancelButton} />
              )}
            {!_confirmButtonConfig?.hide && (
              <Button {..._confirmButtonConfig} />
            )}
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 15,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerCancelButton: {
    position: 'absolute',
    right: 0,
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

export default PopUp;
