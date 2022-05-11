import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Card, Text} from '@/components/atoms';

const PopUp = ({visible, title, data, children}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => console.log('closed')}>
      <View style={styles.modalBackground}>
        <Card style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>{data}</Text>
          </View>
          <View>{children}</View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '80%',
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  },
});

export default PopUp;
