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

import React, {ReactNode, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';

export const DEFAULT_OFFSET = {ios: 70, android: 115};

interface Offset {
  ios: number;
  android: number;
}

interface Refresh {
  loading: boolean;
  fetcher: () => void;
}

const KeyboardAvoidingScrollView = ({
  globalStyle,
  style,
  children,
  keyboardOffset = DEFAULT_OFFSET,
  refresh,
}: {
  globalStyle?: any;
  style?: any;
  children: ReactNode;
  keyboardOffset?: Offset;
  refresh?: Refresh;
}) => {
  const keyboardVerticalOffset = useMemo(() => {
    return {...DEFAULT_OFFSET, ...keyboardOffset};
  }, [keyboardOffset]);

  return (
    <KeyboardAvoidingView
      testID="keyboardAvoidingView"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.containerKeyboard, getZIndexStyles(5)]}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? keyboardVerticalOffset?.ios
          : keyboardVerticalOffset?.android
      }>
      <ScrollView
        testID="keyboardAvoidingScrollView"
        style={globalStyle}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[getZIndexStyles(10), style]}
        refreshControl={
          refresh != null ? (
            <RefreshControl
              refreshing={refresh.loading}
              onRefresh={refresh.fetcher}
            />
          ) : undefined
        }>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getZIndexStyles = (value: number) =>
  Platform.OS === 'ios' ? {zIndex: value} : null;

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
});

export default KeyboardAvoidingScrollView;
