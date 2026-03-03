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
import {Text, Badge, StarScore} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {updateOpportunityScore} from '../../../../features/opportunitySlice';

const OpportunityHeader = ({}) => {
  const dispatch = useDispatch();
  const {getItemColorFromIndex} = useTypeHelpers();

  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

  const updateOpportunityAPI = useCallback(
    newScore => {
      dispatch(
        updateOpportunityScore({
          opportunityId: opportunity.id,
          opportunityVersion: opportunity.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, opportunity.id, opportunity.version],
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        <Text style={styles.textTitle}>{opportunity.name}</Text>
        <Text fontSize={16}>{opportunity.opportunitySeq}</Text>
        <StarScore
          score={opportunity.opportunityRating}
          showMissingStar={true}
          onPress={updateOpportunityAPI}
          editMode={true}
        />
      </View>
      <View>
        {opportunity.opportunityStatus != null && (
          <Badge
            color={getItemColorFromIndex(
              opportunityStatusList,
              opportunity.opportunityStatus,
            )}
            title={opportunity.opportunityStatus?.name}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OpportunityHeader;
