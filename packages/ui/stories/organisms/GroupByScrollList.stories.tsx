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
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Text} from '../../src/components/atoms';
import {GroupByScrollList} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

const DATA = [
  {id: '1', title: 'A. Item 1'},
  {id: '2', title: 'A. Item 2'},
  {id: '3', title: 'B. Item 3'},
  {id: '4', title: 'C. Item 4'},
  {id: '5', title: 'C. Item 5'},
];

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text>{title}</Text>
  </View>
);

const renderItem = ({item}: {item: any}) => {
  return <Item title={item.title} />;
};

const separatorCondition = (prevItem: any, currentItem: any) => {
  return prevItem.title[0] !== currentItem.title[0];
};

const fetchTopIndicator = (
  currentItem: any,
  position?: 'left' | 'center' | 'right' | 'separate',
  iconName?: string,
  iconSize?: number,
  iconColorIndex?: number,
  iconText?: string,
  titleSize?: number,
  numberSize?: number,
  loadingNumber?: boolean,
) => {
  return {
    position: position,
    iconName: iconName,
    iconSize: iconSize,
    iconColor: lightTheme.colors[iconColorIndex],
    iconText: iconText,
    title: currentItem.title[0].toUpperCase(),
    titleSize: titleSize,
    numberItems: DATA.filter(item => item.title[0] === currentItem.title[0])
      .length,
    numberSize: numberSize || 30,
    loadingNumber: loadingNumber,
  };
};

const fetchBottomIndicator = (prevItem: any, showBottomIndicator: boolean) => {
  if (!showBottomIndicator) {
    return null;
  }

  return {
    text: 'End of: ' + prevItem.title[0],
  };
};

storiesOf('ui/organisms/GroupByScrollList', module).add(
  'default',
  args => {
    return (
      <GroupByScrollList
        data={DATA}
        loadingList={false}
        moreLoading={false}
        isListEnd={false}
        renderItem={renderItem}
        fetchData={() => {}}
        filter={false}
        separatorCondition={separatorCondition}
        fetchTopIndicator={currentItem =>
          fetchTopIndicator(
            currentItem,
            args.indicatorPosition,
            args.indicatorIcon,
            args.indicatorIconSize,
            args.indicatorIconColor,
            args.indicatorIconText,
            args.indicatorTitleSize,
            args.indicatorSize,
            args.loadingIndicator,
          )
        }
        fetchBottomIndicator={prevItem =>
          fetchBottomIndicator(prevItem, args.showBottomIndicator)
        }
        {...args}
      />
    );
  },
  {
    argTypes: {
      loadingList: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      moreLoading: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      isListEnd: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      horizontal: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      indicatorPosition: {
        control: {
          type: 'select',
          options: ['left', 'center', 'right', 'separate'],
        },
      },
      indicatorIcon: {
        type: 'string',
        defaultValue: 'info',
        control: {type: 'text'},
      },
      indicatorIconSize: {
        control: {
          type: 'range',
          min: 10,
          max: 50,
          step: 2,
        },
        defaultValue: 30,
      },
      indicatorIconColor: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      indicatorIconText: {
        type: 'string',
        defaultValue: 'Text',
        control: {type: 'text'},
      },
      indicatorTitleSize: {
        control: {
          type: 'range',
          min: 10,
          max: 50,
          step: 2,
        },
        defaultValue: 18,
      },
      indicatorSize: {
        control: {
          type: 'range',
          min: 10,
          max: 50,
          step: 2,
        },
        defaultValue: 30,
      },
      loadingIndicator: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      showBottomIndicator: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
