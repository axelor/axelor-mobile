import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Button, Card, Text} from '@/components/atoms';
import Colors from '@/types/colors';

const PopUpOneButton = ({visible, title, data, btnTitle, onPress}) => {
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
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title={btnTitle} onPress={onPress} />
          </View>
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
    backgroundColor: Colors.background.white,
    width: '100%',
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  button: {
    marginTop: 15,
    backgroundColor: Colors.button.green,
    width: '40%',
    borderRadius: 50,
    elevation: 5,
  },
});

export default PopUpOneButton;
