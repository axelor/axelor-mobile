import React from 'react';
import {EditButton} from '../../../organisms';

const ClientBottom = ({navigation, idClient}) => {
  return (
    <EditButton
      onPress={() =>
        navigation.navigate('ClientFormScreen', {
          idClient: idClient,
        })
      }
    />
  );
};

export default ClientBottom;
