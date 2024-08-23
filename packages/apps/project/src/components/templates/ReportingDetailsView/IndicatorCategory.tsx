/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  formatNumber,
  HorizontalRule,
  Icon,
  IndicatorChart,
  Text,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

const IndicatorCategory = ({title, indicatorList, subCategoryList}) => {
  const I18n = useTranslator();

  const [expanded, setExpanded] = useState(true);

  const renderIndicator = useCallback(
    (data, idx) => {
      return (
        <IndicatorChart
          key={`reportingTimeData${idx}`}
          datasets={[
            {
              ...data,
              value: formatNumber(
                data.value,
                I18n.t('Base_DecimalSpacer'),
                I18n.t('Base_ThousandSpacer'),
              ),
            },
          ]}
          widthGraph={Dimensions.get('window').width / 2}
        />
      );
    },
    [I18n],
  );

  const renderContent = useCallback(() => {
    if (indicatorList != null) {
      return indicatorList.map(renderIndicator);
    }

    if (subCategoryList != null) {
      return subCategoryList.map((data, idx) => (
        <IndicatorCategory {...data} key={`${data.title}-${idx}`} />
      ));
    }

    return null;
  }, [indicatorList, renderIndicator, subCategoryList]);

  return (
    <View>
      <TouchableOpacity
        style={styles.headerTouchable}
        onPress={() => setExpanded(_current => !_current)}>
        <View style={styles.headerContainer}>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            style={styles.icon}
          />
          <Text writingType="title">{title}</Text>
        </View>
        <HorizontalRule />
      </TouchableOpacity>
      {expanded && <View style={styles.dataContainer}>{renderContent()}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTouchable: {
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default IndicatorCategory;
