import React from 'react';
import EditButton from '../../EditButton/EditButton';

const ContactBottom = ({navigation, idContact}) => {
  return (
    <EditButton
      onPress={() =>
        navigation.navigate('ContactFormScreen', {
          idContact: idContact,
        })
      }
    />
  );
};

export default ContactBottom;
