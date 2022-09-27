import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, PopUpOneButton, Text} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const CardStockIndicator = ({title, number}) => {
  const [popUp, setPopUp] = useState(false);
  const I18n = useTranslator();

  const handlePress = () => {
    setPopUp(true);
  };

  return (
    <Card style={styles.card}>
      <PopUpOneButton
        visible={popUp}
        data={number}
        title={title}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setPopUp(!popUp)}
      />
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View style={styles.infos}>
          <Text style={styles.text} numberOfLines={2}>
            {title}
          </Text>
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
    paddingHorizontal: 0,
    paddingVertical: 8,
    paddingRight: 4,
    paddingLeft: 4,
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
    fontSize: 12,
    textAlign: 'center',
  },
  qty: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CardStockIndicator;
