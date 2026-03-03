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

import React, {useCallback, useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useThemeColor,
  ThemeColors,
  useConfig,
  RightIconButton,
  Icon,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {uploadNavigationTools} from '../../../features/configSlice';
import {useIsAdmin} from '../../../../permissions';

const NavigationToolsButton = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const {setActivityIndicator} = useConfig();

  const {loading} = useSelector((state: any) => state.config);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  useEffect(() => {
    if (!loading) {
      setActivityIndicator(false);
    }
  }, [dispatch, setActivityIndicator, loading]);

  const handleSend = useCallback(() => {
    setActivityIndicator(true);
    dispatch((uploadNavigationTools as any)());
  }, [dispatch, setActivityIndicator]);

  if (!isAdmin) {
    return null;
  }

  return (
    <RightIconButton
      icon={
        <Icon name="chevron-right" color={Colors.primaryColor.background} />
      }
      style={styles.content}
      title={I18n.t('User_SendNavigationInformations')}
      onPress={handleSend}
    />
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      width: Dimensions.get('window').width * 0.9,
      height: 40,
      alignSelf: 'center',
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      paddingLeft: 10,
      paddingRight: 25,
      marginRight: 0,
    },
  });

export default NavigationToolsButton;
