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
  AOSImageBubble,
  SocialNetworkLinks,
  useDispatch,
  useSelector,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {updateProspectScore} from '../../../../features/prospectSlice';

const ProspectHeader = ({}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {Partner} = useTypes();
  const {getItemColorFromIndex} = useTypeHelpers();

  const {prospect, prospectStatusList} = useSelector(state => state.prospect);
  const {crm: crmConfig} = useSelector(state => state.appConfig);

  const updateScoreProspectAPI = useCallback(
    (newScore: number) => {
      dispatch(
        (updateProspectScore as any)({
          partnerId: prospect.id,
          partnerVersion: prospect.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, prospect.id, prospect.version],
  );

  return (
    <View style={styles.columnWrapper}>
      <View style={styles.rowWrapper}>
        <AOSImageBubble metaFileId={prospect?.picture?.id} />
        <View style={styles.headerInfo}>
          <Text writingType="title">{prospect.simpleFullName}</Text>
          <StarScore
            score={prospect.leadScoringSelect}
            showMissingStar={true}
            onPress={updateScoreProspectAPI}
            editMode={true}
          />
        </View>
        <View style={styles.columnWrapper}>
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
              color={getItemColorFromIndex(
                prospectStatusList,
                prospect.partnerStatus,
              )}
              title={prospect.partnerStatus.name}
            />
          )}
        </View>
      </View>
      <SocialNetworkLinks
        data={{
          [prospect.partnerTypeSelect === Partner?.partnerTypeSelect.Company
            ? 'company'
            : 'fullName']: prospect?.simpleFullName,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    flexDirection: 'column',
    gap: 2,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    gap: 10,
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
    gap: 5,
  },
});

export default ProspectHeader;
