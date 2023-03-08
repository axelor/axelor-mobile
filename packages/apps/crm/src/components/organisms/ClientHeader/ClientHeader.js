import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, AOSImageBubble} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';

const ClientHeader = ({}) => {
  const {client} = useSelector(state => state.client);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContainerChildren}>
        <AOSImageBubble metaFileId={client?.picture?.id} />
        <View style={styles.headerInfo}>
          <Text style={styles.textTitle} fontSize={16}>
            {client.simpleFullName}
          </Text>
          <Text fontSize={14}>{client.partnerSeq}</Text>
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

export default ClientHeader;
