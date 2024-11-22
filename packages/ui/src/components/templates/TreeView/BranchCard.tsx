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

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon} from '../../atoms';
import {ActionCard, ActionCardType} from '../../organisms';

interface BranchCardProps {
  onPress: () => void;
  children: any;
  isOpen: boolean;
  parent: any;
  onFilterPress: (branch: any) => void;
  infoButtonIndication: string;
  actionList?: ActionCardType[];
  translator: (translationKey: string) => string;
}

const BranchCard = ({
  onPress,
  children,
  isOpen,
  parent,
  onFilterPress,
  infoButtonIndication,
  actionList = [],
  translator,
}: BranchCardProps) => {
  return (
    <ActionCard
      actionList={actionList}
      quickAction={{
        iconName: 'filter',
        helper: infoButtonIndication,
        large: true,
        onPress: () => onFilterPress(parent),
      }}
      translator={translator}>
      <TouchableOpacity
        style={styles.flexOne}
        onPress={onPress}
        activeOpacity={0.9}>
        <Card style={styles.card}>
          <View style={styles.flexOne}>{children}</View>
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
        </Card>
      </TouchableOpacity>
    </ActionCard>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    paddingHorizontal: 15,
    paddingRight: 15,
  },
});

export default BranchCard;
