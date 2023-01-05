import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {AOSImage, useTranslator} from '@axelor/aos-mobile-core';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface MetaFileProps {
  id: number;
  fileName: string;
}

interface ProductionFileLargeCardProps {
  image?: MetaFileProps;
  description: string;
}

function ProductionFileLargeCard({
  image,
  description,
}: ProductionFileLargeCardProps) {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const source = {
    html: `${description}`,
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AOSImage
          metaFile={image}
          defaultIconSize={Dimensions.get('window').width * 0.4}
          imageSize={styles.imageStyle}
          resizeMode="contain"
          enableImageViewer={true}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text}>{I18n.t('Base_Description')}</Text>
        <RenderHTML
          source={source}
          contentWidth={Dimensions.get('window').width * 0.9}
          baseStyle={{color: Colors.text}}
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
