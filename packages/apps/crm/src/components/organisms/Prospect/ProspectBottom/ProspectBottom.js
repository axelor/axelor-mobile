import React from 'react';
import {EditButton} from '../../../organisms';

const ProspectBottom = ({idProspect, navigation}) => {
  return (
    <EditButton
      onPress={() =>
        navigation.navigate('ProspectFormScreen', {
          idProspect: idProspect,
        })
      }
    />
  );
};

export default ProspectBottom;
