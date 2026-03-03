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
import {
  useNavigation,
  usePermitted,
  useSelector,
} from '@axelor/aos-mobile-core';
import {Icon, LabelText, Text} from '@axelor/aos-mobile-ui';

interface DirectoryCardProps {
  directory: any;
}

const DirectoryCard = ({directory}: DirectoryCardProps) => {
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.dms.db.DMSFile',
  });

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title} writingType="important" numberOfLines={2}>
          {directory.fileName}
        </Text>
        <LabelText
          title={directory.createdBy?.fullName}
          iconName="person-fill"
        />
      </View>
      {canCreate &&
        (mobileSettings?.isFolderCreationAllowed ||
          mobileSettings?.isFileCreationAllowed) && (
          <Icon
            style={styles.icon}
            name="plus"
            size={32}
            touchable
            onPress={() =>
              navigation.navigate('DocumentFormScreen', {parent: directory})
            }
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  icon: {
    marginRight: 4,
  },
});

export default DirectoryCard;
