import React from 'react';
import {EditButton} from '../../../organisms';

const LeadBottom = ({idLead, navigation}) => {
  return (
    <EditButton
      onPress={() =>
        navigation.navigate('LeadFormScreen', {
          idLead: idLead,
        })
      }
    />
  );
};

export default LeadBottom;
