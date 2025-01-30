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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {AOSImage} from '@axelor/aos-mobile-core';

interface PartnerInfoCardProps {
  fullName: string;
  partnerSeq: string;
  picture: any;
  style?: any;
  onPress?: () => void;
}

const PartnerInfoCard = ({
  fullName,
  partnerSeq,
  picture,
  style,
  onPress = () => {},
}: PartnerInfoCardProps) => {
  const Colors = useThemeColor();

  if (fullName == null || partnerSeq == null) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.imageContainer}>
          <AOSImage
            generalStyle={styles.imageSize}
            imageSize={styles.imageSize}
            defaultIconSize={50}
            metaFile={picture}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text fontSize={16} style={styles.textImportant}>
            {fullName}
          </Text>
          <Text fontSize={16}>{partnerSeq}</Text>
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
          style={styles.icon}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  icon: {
    justifyContent: 'center',
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  imageContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  textImportant: {
    fontWeight: 'bold',
  },
});

export default PartnerInfoCard;
