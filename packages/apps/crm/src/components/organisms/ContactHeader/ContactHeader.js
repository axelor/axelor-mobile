import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, LabelText} from '@axelor/aos-mobile-ui';
import {useSelector, AOSImageBubble} from '@axelor/aos-mobile-core';

const ContactHeader = ({}) => {
  const {contact} = useSelector(state => state.contact);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContainerChildren}>
        <AOSImageBubble metaFileId={contact?.picture?.id} />
        <View style={styles.headerInfo}>
          <Text style={styles.textTitle} fontSize={16}>
            {contact.simpleFullName}
          </Text>
          <LabelText
            iconName="building"
            title={contact.mainPartner?.fullName}
          />
          {contact.jobTitleFunction && (
            <LabelText
              iconName="suitcase"
              title={contact.jobTitleFunction?.name}
            />
          )}
        </View>
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
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ContactHeader;
