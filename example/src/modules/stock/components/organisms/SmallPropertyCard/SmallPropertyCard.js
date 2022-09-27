import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, PopUpOneButton, Text} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const SmallPropertyCard = ({
  style,
  title,
  value,
  unit = null,
  interactive = false,
}) => {
  const [popUp, setPopUp] = useState(false);
  const I18n = useTranslator();

  const handlePress = () => {
    setPopUp(true);
  };

  return (
    <Card style={[styles.card, style]}>
      <PopUpOneButton
        visible={popUp}
        data={unit == null ? `${value}` : `${value} ${unit}`}
        title={title}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setPopUp(!popUp)}
      />
      {interactive ? (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
          <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
            {unit && <Text style={styles.unit}>{unit}</Text>}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    paddingVertical: 4,
    paddingRight: 4,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: '1%',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  unit: {
    fontSize: 14,
  },
});

export default SmallPropertyCard;
