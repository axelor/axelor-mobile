import React from 'react';
import {EditButton} from '../../../organisms';

const OpportunityBottom = ({opportunityId, navigation}) => {
  return (
    <EditButton
      onPress={() =>
        navigation.navigate('OpportunityFormScreen', {
          opportunityId: opportunityId,
        })
      }
    />
  );
};

export default OpportunityBottom;
