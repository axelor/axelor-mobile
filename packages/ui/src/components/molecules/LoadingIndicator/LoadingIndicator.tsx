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

import React from 'react';
import {ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {useThemeColor} from '../../../theme';
import {BlockInteractionScreen, Card} from '../../atoms';

/**
 * @description To activate this component, please use setActivityIndicator(true) from useConfig of aos-mobile/ui
 * @description To desactivate this component, please use setActivityIndicator(false) from useConfig of aos-mobile/ui
 */

const LoadingIndicator = () => {
  const Colors = useThemeColor();
  const {showActivityIndicator} = useConfig();

  if (!showActivityIndicator) {
    return null;
  }

  return (
    <BlockInteractionScreen hideHeader={true}>
      <Card style={styles.loadingIndicatorCard}>
        <ActivityIndicator
          testID="activityIndicator"
          size="large"
          color={Colors.primaryColor.background}
        />
      </Card>
    </BlockInteractionScreen>
  );
};

const styles = StyleSheet.create({
  loadingIndicatorCard: {
    position: 'relative',
    top: Dimensions.get('window').height * 0.4,
    left: Dimensions.get('window').width * 0.4,
    elevation: 24,
    shadowOpacity: 12,
    paddingRight: 24,
  },
});

export default LoadingIndicator;
