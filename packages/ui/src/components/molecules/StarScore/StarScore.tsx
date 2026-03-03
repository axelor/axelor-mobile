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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Icon} from '../../atoms';
import {
  getIntegerPart,
  isHalf,
  roundHalf,
  roundInteger,
} from '../../../utils/number';

interface StarScoreProps {
  style?: any;
  color?: Color;
  size?: number;
  score: number;
  showHalfStar?: boolean;
  showMissingStar?: boolean;
  onPress?: (any) => void;
  editMode?: boolean;
}

const StarScore = ({
  style,
  color,
  size = 20,
  score,
  showHalfStar = false,
  showMissingStar = false,
  onPress = () => {},
  editMode = false,
}: StarScoreProps) => {
  const Colors = useThemeColor();

  const starColor = useMemo(
    () =>
      color !== undefined ? color.background : Colors.primaryColor.background,
    [Colors, color],
  );

  const roundNbStar = useCallback(
    value => {
      return showHalfStar ? roundHalf(value) : roundInteger(value);
    },
    [showHalfStar],
  );

  const onPressStar = useCallback(
    newScore => {
      onPress(newScore === score ? 0 : newScore);
    },
    [onPress, score],
  );

  const renderStars = useCallback(
    nbStar => {
      const nbStarLimit = nbStar > 5 ? 5 : nbStar < 0 ? 0 : nbStar;
      const nbStarRound = roundNbStar(nbStarLimit);
      let starList: React.ReactNode[] = [];
      const fullStarsNb = getIntegerPart(nbStarRound);

      for (let index = 1; index <= fullStarsNb; index++) {
        starList.push(
          <Icon
            key={index}
            name="star-fill"
            color={starColor}
            size={size}
            touchable={editMode}
            onPress={() => onPressStar(index)}
          />,
        );
      }

      if (isHalf(nbStarRound)) {
        starList.push(
          <Icon
            key={fullStarsNb + 1}
            name={showMissingStar ? 'star-half' : 'start-half-fill'}
            color={starColor}
            size={size}
            touchable={editMode}
            onPress={() => onPress && onPressStar(fullStarsNb + 1)}
          />,
        );
      }

      if (showMissingStar) {
        for (let index = starList.length; index < 5; index++) {
          starList.push(
            <Icon
              key={index + 1}
              onPress={() => onPress && onPressStar(index + 1)}
              name="star"
              color={starColor}
              size={size}
              touchable={editMode}
            />,
          );
        }
      }

      return starList;
    },
    [
      roundNbStar,
      showMissingStar,
      starColor,
      size,
      editMode,
      onPressStar,
      onPress,
    ],
  );

  const starScoring: React.ReactNode[] = useMemo(
    () => renderStars(score),
    [renderStars, score],
  );

  return (
    <View style={[styles.leadScoring, style]} testID="starScoreContainer">
      {starScoring.map(star => star)}
    </View>
  );
};

const styles = StyleSheet.create({
  leadScoring: {
    flexDirection: 'row',
  },
});

export default StarScore;
