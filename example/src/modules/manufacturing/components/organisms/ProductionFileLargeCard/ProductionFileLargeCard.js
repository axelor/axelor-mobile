import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {AOSImage, useTranslator} from '@aos-mobile/core';
import {Text} from '@aos-mobile/ui';

function ProductionFileLargeCard({imageId, description}) {
  const I18n = useTranslator();

  const source = {
    html: `${description}`,
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AOSImage
          metaFileId={imageId}
          defaultIconSize={Dimensions.get('window').width * 0.4}
          imageSize={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text}>{I18n.t('Base_Description')}</Text>
        <RenderHTML
          source={source}
          contentWidth={Dimensions.get('window').width * 0.9}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  descriptionContainer: {
    padding: 10,
    maxHeight: Dimensions.get('window').width * 0.4,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
  },
  text: {
    textTransform: 'uppercase',
  },
});

export default ProductionFileLargeCard;
