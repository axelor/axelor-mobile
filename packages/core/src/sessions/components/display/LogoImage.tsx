/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {checkNullString, testUrl} from '../../../utils';

const axelorLogoPath = '../../../assets/Logo_Axelor.png';

async function generateImageSourceWithUrl(url?: string, logoPath?: string) {
  if (checkNullString(url)) return undefined;

  const _url = await testUrl(url!)
    .then(result => result)
    .catch(() => undefined);

  if (_url == null) return undefined;

  return {uri: `${_url}/img/${logoPath}`};
}

const LogoImage = ({
  url,
  filePath = 'logo.png',
  logoFile,
}: {
  url?: string;
  filePath?: string;
  logoFile?: any;
}) => {
  const companyLogoFile = useRef(logoFile ?? require(axelorLogoPath)).current;

  const [source, setSource] = useState(companyLogoFile);

  const urlLogoSource: any = useMemo(
    () =>
      checkNullString(url)
        ? generateImageSourceWithUrl(url, filePath)
        : undefined,
    [filePath, url],
  );

  useEffect(() => {
    if (urlLogoSource != null) {
      axios
        .head(urlLogoSource.uri)
        .then(({status}) => {
          if (status === 200) setSource(urlLogoSource);
        })
        .catch(() => setSource(companyLogoFile));
    } else {
      setSource(companyLogoFile);
    }
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
