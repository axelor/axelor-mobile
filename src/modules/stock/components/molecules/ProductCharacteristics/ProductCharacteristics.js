import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import Product from '@/modules/stock/types/product';
import Colors from '@/types/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCharacteristics = ({
  style,
  pictureURI,
  onPressImage,
  name,
  code,
  category,
  procurMethod,
  prototype,
  unrenewed,
}) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        {pictureURI == null ? (
          <Icon name="camera" style={styles.icon} />
        ) : (
          <TouchableOpacity onPress={onPressImage}>
            <Image
              resizeMode="contain"
              source={pictureURI}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.code}>{code}</Text>
          <View style={styles.states}>
            {category && (
              <Badge color={Colors.background.green} title={category} />
            )}
            {procurMethod && (
              <Badge
                color={Colors.background.purple}
                title={Product.getProcurementMethod(procurMethod)}
              />
            )}
            {prototype && (
              <Badge color={Colors.background.blue} title="Prototype" />
            )}
            {unrenewed && (
              <Badge color={Colors.background.orange} title="Unrenewed" />
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: null,
  },
  content: {
    flexDirection: 'row',
  },
  states: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 32,
  },
  icon: {
    fontSize: 120,
    color: Colors.icon.light_grey,
    marginRight: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCharacteristics;
