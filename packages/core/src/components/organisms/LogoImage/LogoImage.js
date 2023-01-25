/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet} from 'react-native';

const axelorLogoPath = '../../../assets/Logo_Axelor.png';

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
