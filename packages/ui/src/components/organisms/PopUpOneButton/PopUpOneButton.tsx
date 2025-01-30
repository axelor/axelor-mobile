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
import {StyleSheet} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Button, PopUp} from '../../molecules';

interface PopUpOneButtonProps {
  visible: boolean;
  title: string;
  data: string;
  btnTitle: string;
  onPress: () => void;
}

const PopUpOneButton = ({
  visible,
  title,
  data,
  btnTitle,
  onPress,
}: PopUpOneButtonProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <PopUp visible={visible} title={title} data={data}>
      <Button style={styles.button} title={btnTitle} onPress={onPress} />
    </PopUp>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      alignSelf: 'center',
      marginTop: 15,
      elevation: 5,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      width: '40%',
    },
  });

export default PopUpOneButton;
