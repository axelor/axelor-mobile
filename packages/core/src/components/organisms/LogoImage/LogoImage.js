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
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {checkNullString} from '../../../utils';

const axelorLogoPath = '../../../assets/Logo_Axelor.png';

const LogoImage = ({url = null, filePath = 'logo.png', logoFile = null}) => {
  const companyLogoFile = useRef(logoFile ?? require(axelorLogoPath)).current;
  const [source, setSource] = useState(companyLogoFile);

  const generateImageSourceWithUrl = useCallback(
    _url => ({uri: `${_url}/img/${filePath}`}),
    [filePath],
  );

  const urlLogoSource = useMemo(
    () => (checkNullString(url) ? generateImageSourceWithUrl(url) : null),
    [generateImageSourceWithUrl, url],
  );

  useEffect(() => {
    if (urlLogoSource != null) {
      axios
        .head(urlLogoSource.uri)
        .then(({status}) => {
          if (status === 200) {
            setSource(urlLogoSource);
          }
        })
        .catch(() => setSource(companyLogoFile));
    }
    setSource(companyLogoFile);
  }, [companyLogoFile, urlLogoSource]);

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

export default LogoImage;
