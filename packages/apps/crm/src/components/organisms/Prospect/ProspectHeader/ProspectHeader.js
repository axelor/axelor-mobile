import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Badge, StarScore, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  AOSImageBubble,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {updateProspectScore} from '../../../../features/prospectSlice';

const ProspectHeader = ({}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {prospect} = useSelector(state => state.prospect);

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
        {prospect.partnerCategory?.name && (
          <Badge
            color={Colors.progressColor}
            title={prospect.partnerCategory?.name}
          />
        )}
        {prospect.industrySector?.name && (
          <Badge
            color={Colors.plannedColor}
            title={prospect.industrySector?.name}
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
