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

import React, {ReactElement, useCallback} from 'react';
import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';
import {Card, Icon, Text} from '../../atoms';
import {Badge, Image, LabelText} from '../../molecules';

const filterList = (list: any[]): any[] => {
  if (!Array.isArray(list)) {
    return [];
  }

  return list
    .map((item, index) => {
      if (item.order != null) {
        return item;
      }

      return {...item, order: index * 10};
    })
    .sort((a, b) => a.order - b.order);
};

interface TextElement {
  style?: any;
  displayText?: string;
  indicatorText?: string;
  fontSize?: number;
  size?: number;
  iconName?: string;
  color?: string;
  isTitle?: boolean;
  hideIfNull?: boolean;
  hideIf?: boolean;
  order?: number;
  numberOfLines?: number;
  customComponent?: ReactElement<any>;
}

interface BadgeElement {
  style?: any;
  displayText?: string;
  color?: Color;
  showIf?: boolean;
  order?: number;
  customComponent?: ReactElement<any>;
}

interface ImageElement {
  source: ImageSourcePropType;
  defaultIconSize?: number;
  resizeMode: ImageResizeMode;
  imageSize?: StyleProp<ImageStyle>;
  generalStyle?: StyleProp<ImageStyle>;
}

interface ObjectCardProps {
  style?: any;
  leftContainerFlex?: number;
  iconLeftMargin?: number;
  touchable?: boolean;
  onPress?: () => void;
  showArrow?: boolean;
  upperBadges?: {
    style?: any;
    fixedOnRightSide?: boolean;
    items: BadgeElement[];
  };
  sideBadges?: {
    style?: any;
    items: BadgeElement[];
  };
  lowerBadges?: {
    style?: any;
    fixedOnRightSide?: boolean;
    items: BadgeElement[];
  };
  image?: ImageElement;
  upperTexts?: {
    style?: any;
    items: TextElement[];
  };
  lowerTexts?: {
    style?: any;
    items: TextElement[];
  };
}

const ObjectCard = ({
  style,
  leftContainerFlex = 3,
  iconLeftMargin = 20,
  touchable = true,
  onPress,
  showArrow = true,
  upperBadges,
  sideBadges,
  lowerBadges,
  upperTexts,
  lowerTexts,
  image,
}: ObjectCardProps) => {
  const Colors = useThemeColor();

  const initBadgeItems = useCallback(
    (list: BadgeElement[]): BadgeElement[] => filterList(list),
    [],
  );

  const initTextItems = useCallback(
    (list: TextElement[]): TextElement[] =>
      filterList(list).map((_item: TextElement) => {
        /**
         * NOTE: we want to only change default value
         * but keep the possibility to give 'null' value to adapt to text length
         */
        if (_item.numberOfLines === undefined) {
          return {..._item, numberOfLines: _item.isTitle ? 2 : 1};
        }

        return _item;
      }),
    [],
  );

  const renderTextElement = useCallback((item: TextElement) => {
    if (item.hideIf) {
      return null;
    }

    if (item.customComponent != null) {
      return React.cloneElement(item.customComponent, {
        key: `${item.displayText} - ${item.order}`,
      });
    }

    if (
      item.hideIfNull &&
      checkNullString(item.displayText) &&
      checkNullString(item.indicatorText)
    ) {
      return null;
    }

    if (item.isTitle) {
      return (
        <Text
          key={`${item.displayText} - ${item.order}`}
          writingType="title"
          fontSize={item.fontSize}
          style={[styles.text, item.style]}
          numberOfLines={item.numberOfLines}>
          {item.displayText}
        </Text>
      );
    }

    if (checkNullString(item.iconName) && checkNullString(item.indicatorText)) {
      return (
        <Text
          key={`${item.displayText} - ${item.order}`}
          writingType="subtitle"
          fontSize={item.fontSize}
          style={[styles.text, item.style]}
          numberOfLines={item.numberOfLines}>
          {item.displayText}
        </Text>
      );
    }

    return (
      <LabelText
        key={`${item.displayText} - ${item.order}`}
        style={[styles.text, item.style]}
        textStyle={item.style}
        iconName={item.iconName}
        size={item.size}
        textSize={item.fontSize}
        color={item.color}
        title={item.indicatorText}
        value={item.displayText}
        onlyOneLine={item.numberOfLines === 1}
      />
    );
  }, []);

  const renderBadgeElement = useCallback((item: BadgeElement) => {
    if (item.customComponent != null) {
      return React.cloneElement(item.customComponent, {
        key: `${item.displayText} - ${item.order}`,
      });
    }

    if (item.showIf === false || checkNullString(item.displayText)) {
      return null;
    }

    return (
      <Badge
        key={`${item.displayText} - ${item.order}`}
        style={item.style}
        color={item.color}
        title={item.displayText}
      />
    );
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      testID="objectCardTouchable"
      disabled={!touchable}>
      <Card style={[styles.container, style]}>
        {upperBadges != null && (
          <View
            style={[
              styles.horizontalBadgesContainer,
              upperBadges.fixedOnRightSide
                ? styles.badgesFixedOnRightSide
                : null,
              upperBadges.style,
            ]}>
            {initBadgeItems(upperBadges.items).map(renderBadgeElement)}
          </View>
        )}
        <View style={styles.content}>
          <View
            style={[styles.descriptionContainer, {flex: leftContainerFlex}]}>
            <View style={styles.row}>
              {image != null ? (
                <Image
                  generalStyle={[styles.imageStyle, image.generalStyle]}
                  imageSize={[styles.imageSize, image.imageSize]}
                  resizeMode={image.resizeMode ?? 'contain'}
                  source={image.source}
                  defaultIconSize={image.defaultIconSize ?? 50}
                />
              ) : null}
              {upperTexts != null && (
                <View style={[styles.textContainer, upperTexts.style]}>
                  {initTextItems(upperTexts.items).map(renderTextElement)}
                </View>
              )}
            </View>
            <View style={styles.row}>
              {lowerTexts != null && (
                <View style={[styles.textContainer, lowerTexts.style]}>
                  {initTextItems(lowerTexts.items).map(renderTextElement)}
                </View>
              )}
            </View>
          </View>
          {sideBadges != null && (
            <View style={[styles.verticalBadgesContainer, sideBadges.style]}>
              {initBadgeItems(sideBadges.items).map(renderBadgeElement)}
            </View>
          )}
          {showArrow && (
            <Icon
              name="chevron-right"
              color={Colors.secondaryColor.background_light}
              size={20}
              style={{marginLeft: iconLeftMargin}}
            />
          )}
        </View>
        {lowerBadges != null && (
          <View
            style={[
              styles.horizontalBadgesContainer,
              lowerBadges.fixedOnRightSide
                ? styles.badgesFixedOnRightSide
                : null,
              lowerBadges.style,
            ]}>
            {initBadgeItems(lowerBadges.items).map(renderBadgeElement)}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 12,
    marginVertical: 4,
    paddingHorizontal: 15,
    paddingRight: 15,
    paddingVertical: 10,
  },
  horizontalBadgesContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  badgesFixedOnRightSide: {
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    width: '100%',
  },
  descriptionContainer: {
    flexDirection: 'column',
    width: '75%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSize: {
    height: 60,
    width: 60,
  },
  imageStyle: {
    marginRight: 10,
    flex: 1,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 3,
  },
  verticalBadgesContainer: {
    marginLeft: 5,
    flexDirection: 'column',
    height: '100%',
    flex: 1,
  },
  text: {
    width: '100%',
  },
});

export default ObjectCard;
