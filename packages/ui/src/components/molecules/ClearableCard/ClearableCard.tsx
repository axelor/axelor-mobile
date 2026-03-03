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

import React, {useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme';
import {Card, Icon, Text} from '../../atoms';

interface ClearableCardPops {
  style?: any;
  valueTxt: string;
  onClearPress: () => void;
  clearable: boolean;
}

const ClearableCard = ({
  style,
  valueTxt,
  onClearPress,
  clearable = true,
}: ClearableCardPops) => {
  const Colors = useThemeColor();
  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <Card
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        commonStyles.filterSize,
        style,
      ]}>
      <Text style={styles.text}>{valueTxt}</Text>
      {clearable && (
        <Icon
          name="x-lg"
          touchable={true}
          onPress={onClearPress}
          size={Dimensions.get('window').width * 0.05}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '95%',
    margin: 1,
  },
});

export default ClearableCard;
