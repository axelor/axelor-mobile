import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet} from 'react-native';

const axelorLogoPath = '../../assets/Logo_Axelor.png';

const LogoImage = ({url}) => {
  const axelorLogo = useRef(require(axelorLogoPath)).current;
  const [urlLogoSource, setUrlLogoSource] = useState(
    generateImageSourceWithUrl(url),
  );
  const [source, setSource] = useState(axelorLogo);

  useEffect(() => {
    setUrlLogoSource(generateImageSourceWithUrl(url));
  }, [url]);

  useEffect(() => {
    axios
      .head(urlLogoSource.uri)
      .then(({status}) => {
        if (status === 200) {
          setSource(urlLogoSource);
        }
      })
      .catch(() => setSource(axelorLogo));
  }, [axelorLogo, urlLogoSource]);

  return (
    <Image resizeMode="contain" style={styles.imageSize} source={source} />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    width: '100%',
    height: '100%',
  },
});

const generateImageSourceWithUrl = url => ({uri: concatLogoSuffixToUrl(url)});
const concatLogoSuffixToUrl = url => `${url}/img/${logoName}`;
const logoName = 'logo.png';

export default LogoImage;
