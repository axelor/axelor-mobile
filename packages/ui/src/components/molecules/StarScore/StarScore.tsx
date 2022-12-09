import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from '../../../theme/themes';
import {useThemeColor} from '../../../theme/ThemeContext';
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
}

const StarScore = ({
  style,
  color,
  size = 20,
  score,
  showHalfStar = false,
  showMissingStar = false,
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
            FontAwesome5={false}
            name="star"
            color={starColor}
            size={size}
          />,
        );
      }

      if (isHalf(nbStarRound)) {
        starList.push(
          <Icon
            key={fullStarsNb + 1}
            FontAwesome5={false}
            name={showMissingStar ? 'star-half-empty' : 'star-half'}
            color={starColor}
            size={size}
          />,
        );
      }

      if (showMissingStar) {
        for (let index = starList.length; index < 5; index++) {
          starList.push(
            <Icon
              key={index + 1}
              FontAwesome5={false}
              name="star-o"
              color={starColor}
              size={size}
            />,
          );
        }
      }

      return starList;
    },
    [roundNbStar, showMissingStar, size, starColor],
  );

  const starScoring: React.ReactNode[] = useMemo(
    () => renderStars(score),
    [renderStars, score],
  );

  return (
    <View style={[styles.leadScoring, style]}>
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
