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

import React from 'react';
import {
  Platform,
  ScrollView as ReactNativeScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';

interface Refresh {
  loading: boolean;
  fetcher: () => void;
}

interface ScrollViewProps {
  style?: any;
  children?: any;
  refresh?: Refresh;
}

const ScrollView = ({style, children, refresh}: ScrollViewProps) => {
  return (
    <ReactNativeScrollView
      contentContainerStyle={[
        styles.container,
        Platform.OS === 'ios' ? styles.containerZIndex : null,
        style,
      ]}
      refreshControl={
        refresh != null && (
          <RefreshControl
            refreshing={refresh.loading}
            onRefresh={refresh.fetcher}
          />
        )
      }>
      {children}
    </ReactNativeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    height: '100%',
  },
  containerZIndex: {
    zIndex: 10,
  },
});

export default ScrollView;
