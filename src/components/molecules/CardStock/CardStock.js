import {Card, Text} from '@/components/atoms';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {PopUpOneButton} from '@/components/organisms';

const CardStock = ({title, number}) => {
  const [popUp, setPopUp] = useState(false);

  const handlePress = () => {
    setPopUp(true);
  };

  return (
    <Card style={styles.card}>
      <PopUpOneButton
        visible={popUp}
        data={number}
        title={title}
        btnTitle="OK"
        onPress={() => setPopUp(!popUp)}
      />
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View style={styles.infos}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.qty} adjustsFontSizeToFit={true}>
            {number}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '1%',
    marginVertical: '1%',
    width: '28.2%',
    height: 90,
  },
  infos: {
    flex: 1,
  },
  text: {
    flex: 1,
    color: '#606060',
    fontSize: 12,
    textAlign: 'center',
  },
  qty: {
    flex: 1,
    fontSize: 24,
    color: '#606060',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CardStock;
