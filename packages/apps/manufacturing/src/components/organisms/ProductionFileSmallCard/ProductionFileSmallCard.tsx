import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {AOSImage} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';

interface MetaFileProps {
  id: number;
  fileName: string;
}

interface ProductionFileSmallCardProps {
  image?: MetaFileProps;
  description: string;
}

function ProductionFileSmallCard({
  image,
  description,
}: ProductionFileSmallCardProps) {
  const Colors = useThemeColor();

  const source = {
    html: `${description}`,
  };

  return (
    <View style={styles.container}>
      <AOSImage
        metaFile={image}
        defaultIconSize={Dimensions.get('window').width * 0.25}
        imageSize={styles.imageStyle}
        resizeMode="contain"
        enableImageViewer={true}
      />
      <View style={styles.description}>
        <RenderHTML
          source={source}
          contentWidth={Dimensions.get('window').width * 0.7}
          baseStyle={{color: Colors.text}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imageStyle: {
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.25,
  },
  description: {
    padding: 10,
    maxHeight: Dimensions.get('window').height * 0.12,
    maxWidth: Dimensions.get('window').width * 0.7,
  },
});

export default ProductionFileSmallCard;
