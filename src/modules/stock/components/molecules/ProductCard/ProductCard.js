import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {Card, Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';


const ProductCard = ({style, name, code,onPressImage, pictureId, onPress}) => {
  const Image_Http_URL = {
    uri: `http://192.168.122.1:8080/ws/rest/com.axelor.meta.db.MetaFile/${pictureId}/content/download/`,
  };
  console.log(Image_Http_URL);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onPressImage}> 
            <Image
              resizeMode="contain"
              source={Image_Http_URL}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
          </View>
        </View>
        <Icon size={24} name="chevron-right" color="#e6e6e6" />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.14,
    color: '#cecece',
    marginRight: 30,
  },
});

export default ProductCard;
