import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CircleButton} from '@axelor/aos-mobile-ui';
import {useSelector} from '@axelor/aos-mobile-core';

const OpportunityBottom = ({navigation}) => {
  const {opportunity} = useSelector(state => state.opportunity);

  return (
    <View style={styles.bottomContainer}>
      <CircleButton
        iconName="pen"
        onPress={() =>
          navigation.navigate('OpportunityFormScreen', {
            opportunityId: opportunity.id,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    marginBottom: 25,
  },
});

export default OpportunityBottom;
