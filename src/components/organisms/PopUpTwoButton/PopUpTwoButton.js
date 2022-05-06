import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Button, Card, Text} from '@/components/atoms';

const PopUpTwoButton = ({
  visible,
  title,
  data,
  PrimaryBtnTitle,
  onPressPrimary,
  SecondaryBtnTitle,
  onPressSecondary,
}) => {
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
            <Button
              style={styles.button_secondary}
              title={SecondaryBtnTitle}
              onPress={onPressSecondary}
            />
            <Button
              style={styles.button_primary}
              title={PrimaryBtnTitle}
              onPress={onPressPrimary}
            />
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
    backgroundColor: '#fff',
    width: '80%',
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  button_primary: {
    marginTop: 15,
    backgroundColor: '#3ECF8E',
    width: '50%',
    borderRadius: 50,
    elevation: 5,
  },
  button_secondary: {
    marginTop: 15,
    backgroundColor: '#CECECE',
    width: '40%',
    borderRadius: 50,
    elevation: 5,
  },
});

export default PopUpTwoButton;
