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

import React, {ReactNode, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

const DEFAULT_OFFSET = {ios: 70, android: 180};

interface Offset {
  ios: number;
  android: number;
}

const KeyboardAvoidingScrollView = ({
  globalStyle,
  style,
  children,
  keyboardOffset = DEFAULT_OFFSET,
}: {
  globalStyle?: any;
  style?: any;
  children: ReactNode;
  keyboardOffset?: Offset;
}) => {
  const keyboardVerticalOffset = useMemo(() => {
    return {...DEFAULT_OFFSET, ...keyboardOffset};
  }, [keyboardOffset]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.containerKeyboard, getZIndexStyles(5)]}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? keyboardVerticalOffset?.ios
          : keyboardVerticalOffset?.android
      }>
      <ScrollView
        style={globalStyle}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={[
          styles.scrollContent,
          getZIndexStyles(10),
          style,
        ]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getZIndexStyles = value =>
  Platform.OS === 'ios' ? {zIndex: value} : null;

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
  scrollContent: {
    height: null,
  },
});

export default KeyboardAvoidingScrollView;
