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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Icon, Text} from '@axelor/aos-mobile-ui';

const SectionHeader = ({
  titleKey,
  expanded,
  onPress,
  onEdit,
  showEdit = true,
}: {
  titleKey: string;
  expanded: boolean;
  onPress: () => void;
  onEdit?: () => void;
  showEdit?: boolean;
}) => {
  const I18n = useTranslator();

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.titleContainer} onPress={onPress}>
        <Text writingType="title" style={styles.title}>
          {I18n.t(titleKey)}
        </Text>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'} />
      </TouchableOpacity>
      <Icon
        name="pencil-fill"
        visible={showEdit}
        touchable={true}
        onPress={onEdit}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 7,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
});

export default SectionHeader;
