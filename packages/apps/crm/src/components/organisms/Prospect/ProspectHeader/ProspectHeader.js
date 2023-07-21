/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  Badge,
  StarScore,
  useThemeColor,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  AOSImageBubble,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {updateProspectScore} from '../../../../features/prospectSlice';
import {Prospect} from '../../../../types';

const ProspectHeader = ({colorIndex}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {prospect} = useSelector(state => state.prospect);
  const {crmConfig} = useSelector(state => state.crmConfig);

  const updateScoreProspectAPI = useCallback(
    newScore => {
      dispatch(
        updateProspectScore({
          partnerId: prospect.id,
          partnerVersion: prospect.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, prospect.id, prospect.version],
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContainerChildren}>
        <AOSImageBubble metaFileId={prospect?.picture?.id} />
        <View style={styles.headerInfo}>
          <Text style={styles.textTitle} fontSize={16}>
            {prospect.simpleFullName}
          </Text>
          <StarScore
            style={styles.leadScoring}
            score={prospect.leadScoringSelect}
            showMissingStar={true}
            onPress={updateScoreProspectAPI}
            editMode={true}
          />
        </View>
      </View>
      <View style={styles.headerBadge}>
        {!checkNullString(prospect.partnerCategory?.name) && (
          <Badge
            color={Colors.progressColor}
            title={prospect.partnerCategory?.name}
          />
        )}
        {!checkNullString(prospect.industrySector?.name) && (
          <Badge
            color={Colors.plannedColor}
            title={prospect.industrySector?.name}
          />
        )}
        {prospect.partnerStatus && crmConfig?.crmProcessOnPartner && (
          <Badge
            color={Prospect.getStatusColor(colorIndex, Colors)}
            title={prospect.partnerStatus.name}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainerChildren: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'column',
    marginLeft: '7%',
  },
  headerBadge: {
    flexDirection: 'column',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  leadScoring: {
    marginTop: '10%',
  },
});

export default ProspectHeader;
