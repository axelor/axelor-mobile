import React, {useMemo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Badge, StarScore, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {Opportunity} from '../../../../types';
import {updateOpportunityScore} from '../../../../features/opportunitySlice';

const OpportunityHeader = ({}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

  const colorIndex = useMemo(
    () =>
      opportunityStatusList?.findIndex(
        status => status.id === opportunity.opportunityStatus?.id,
      ),
    [opportunityStatusList, opportunity.opportunityStatus],
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
        {opportunity.opportunityStatus && (
          <Badge
            color={Opportunity.getStatusColor(colorIndex, Colors)}
            title={opportunity.opportunityStatus.name}
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
