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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Alert, Color, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {ConfirmationConfig, confirmationProvider} from './ConfirmationProvider';

/* Mounted once at the app root: shows the popups opened with confirmationProvider. */
/* Text-only button: no fill and no border, label and icon in the given colour. */
const textButtonColor = (color: string): Color => ({
  background: 'transparent',
  background_light: 'transparent',
  foreground: color,
});

const ConfirmationHost = () => {
  const Colors = useThemeColor();

  const [config, setConfig] = useState<ConfirmationConfig | null>(null);

  useEffect(() => {
    confirmationProvider.registerListener(setConfig);

    return () => {
      confirmationProvider.unregisterListener(setConfig);
    };
  }, []);

  const cancelColor = useMemo(() => textButtonColor(Colors.text), [Colors]);
  const confirmColor = useMemo(
    () => textButtonColor(Colors.errorColor.background),
    [Colors],
  );

  const handleCancel = useCallback(() => setConfig(null), []);

  const handleConfirm = useCallback(() => {
    const onConfirm = config?.onConfirm;
    setConfig(null);
    onConfirm?.();
  }, [config]);

  return (
    <Alert
      style={styles.container}
      visible={config != null}
      title={config?.title}
      cancelButtonConfig={{
        title: config?.cancelLabel,
        color: cancelColor,
        onPress: handleCancel,
      }}
      confirmButtonConfig={{
        title: config?.confirmLabel,
        color: confirmColor,
        onPress: handleConfirm,
      }}>
      <Text style={styles.message}>{config?.message}</Text>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
  },
  message: {
    textAlign: 'center',
  },
});

export default ConfirmationHost;
