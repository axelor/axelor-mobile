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
import {Card, Icon} from '../../atoms';
import {ActionCard, ActionCardType} from '../../organisms';

interface BranchCardProps {
  style?: any;
  onPress: () => void;
  children: any;
  isOpen: boolean;
}

const BranchCard = ({style, onPress, children, isOpen}: BranchCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.flexOne, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Card style={styles.card}>
        <View style={styles.flexOne}>{children}</View>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
      </Card>
    </TouchableOpacity>
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
    marginRight: 2,
    paddingHorizontal: 15,
    paddingRight: 15,
  },
});

interface BranchActionCardProps {
  onPress: () => void;
  children: any;
  isOpen: boolean;
  parent: any;
  onFilterPress: (branch: any) => void;
  isBranchFilterVisible?: boolean;
  infoButtonIndication: string;
  actionList?: ActionCardType[];
  translator: (translationKey: string) => string;
}

const BranchActionCard = ({
  onPress,
  children,
  isOpen,
  parent,
  onFilterPress,
  isBranchFilterVisible,
  infoButtonIndication,
  actionList = [],
  translator,
}: BranchActionCardProps) => {
  return (
    <ActionCard
      actionList={actionList}
      quickAction={{
        iconName: 'filter',
        helper: infoButtonIndication,
        onPress: () => onFilterPress(parent),
        hidden: !isBranchFilterVisible,
      }}
      translator={translator}>
      <BranchCard onPress={onPress} children={children} isOpen={isOpen} />
    </ActionCard>
  );
};

export default BranchActionCard;
