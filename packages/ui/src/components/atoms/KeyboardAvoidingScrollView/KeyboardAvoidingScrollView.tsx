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

import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

const KeyboardAvoidingScrollView = ({
  globalStyle,
  style,
  children,
  keyboardOffset = {ios: 70, android: 180},
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerKeyboard}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? keyboardOffset?.ios : keyboardOffset?.android
      }>
      <ScrollView
        style={globalStyle}
        contentContainerStyle={[styles.scrollContent, style]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    height: '100%',
    zIndex: 10,
  },
});

export default KeyboardAvoidingScrollView;
