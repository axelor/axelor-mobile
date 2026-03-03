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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {Meta} from '@storybook/react';
import {GroupByScrollList as Component, Text} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const DATA = [
  {id: '1', title: 'A. Item 1'},
  {id: '2', title: 'A. Item 2'},
  {id: '3', title: 'B. Item 3'},
  {id: '4', title: 'C. Item 4'},
  {id: '5', title: 'C. Item 5'},
];

const renderItem = ({item}: {item: any}) => {
  return (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
};

const separatorCondition = (prevItem: any, currentItem: any) => {
  return prevItem.title[0] !== currentItem.title[0];
};

const fetchTopIndicator = (
  currentItem: any,
  position?: 'left' | 'center' | 'right' | 'separate',
  iconName?: string,
  iconSize?: number,
  iconColor?: number,
  iconText?: string,
  titleSize?: number,
  numberSize?: number,
  loadingNumber?: boolean,
) => {
  return {
    position,
    iconName,
    iconSize,
    iconColor,
    iconText,
    title: currentItem.title[0].toUpperCase(),
    titleSize,
    numberItems: DATA.filter(item => item.title[0] === currentItem.title[0])
      .length,
    numberSize: numberSize || 30,
    loadingNumber,
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

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/GroupByScrollList',
  component: Component,
};

export default meta;

export const GroupByScrollList: Story<typeof Component> = {
  args: {
    loadingList: false,
    moreLoading: false,
    isListEnd: false,
    horizontal: false,
    indicatorPosition: 'left',
    indicatorIcon: 'info',
    indicatorIconSize: 30,
    indicatorIconColor: 'primaryColor',
    indicatorIconText: 'Text',
    indicatorTitleSize: 18,
    indicatorSize: 30,
    loadingIndicator: false,
    showBottomIndicator: false,
    displayStickyIndicator: false,
    disabledRefresh: false,
  },
  argTypes: {
    indicatorPosition: {
      control: {type: 'select'},
      options: ['left', 'center', 'right', 'separate'],
    },
    indicatorIconColor: colorPicker,
    data: disabledControl,
    renderItem: disabledControl,
    fetchData: disabledControl,
    fetchBottomIndicator: disabledControl,
    fetchTopIndicator: disabledControl,
    separatorCondition: disabledControl,
    customBottomSeparator: disabledControl,
    customTopSeparator: disabledControl,
    actionList: disabledControl,
    verticalActions: disabledControl,
    translator: disabledControl,
    filter: disabledControl,
  },
  render: args => (
    <Component
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
  ),
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
