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

interface PopUpTwoButtonProps {
  visible: boolean;
  title: string;
  data: string;
  PrimaryBtnTitle: string;
  onPressPrimary: () => void;
  SecondaryBtnTitle: string;
  onPressSecondary: () => void;
}

const PopUpTwoButton = ({
  visible,
  title,
  data,
  PrimaryBtnTitle,
  onPressPrimary,
  SecondaryBtnTitle,
  onPressSecondary,
}: PopUpTwoButtonProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <PopUp visible={visible} title={title} data={data}>
      <Button
        style={styles.button}
        color={Colors.secondaryColor}
        title={SecondaryBtnTitle}
        onPress={onPressSecondary}
      />
      <Button
        style={styles.button}
        color={Colors.primaryColor}
        title={PrimaryBtnTitle}
        onPress={onPressPrimary}
      />
    </PopUp>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      marginHorizontal: 4,
      marginTop: 15,
      elevation: 5,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      width: '40%',
    },
  });

export default PopUpTwoButton;
