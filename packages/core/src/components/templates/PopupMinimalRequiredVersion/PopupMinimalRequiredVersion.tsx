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

import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet} from 'react-native';
import {
  Alert,
  Button,
  checkNullString,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {downloadFileOnPhone, linkingProvider} from '../../../tools';
import {useDispatch, useSelector} from '../../../redux/hooks';
import {useTranslator} from '../../../i18n';
import {logout} from '../../../features/authSlice';

const BUTTON_WIDTH = 250;

const DOWNLOAD = {
  NOT_ATTEMPTED: 0,
  LOADING: 2,
  ATTEMPTED: 3,
};

const PopupMinimalRequiredVersion = ({versionCheckConfig, onRefresh}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [apkDownloaded, setApkDownloaded] = useState(false);
  const [downloadAttempted, setDownloadAttempted] = useState<number>(
    DOWNLOAD.NOT_ATTEMPTED,
  );

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {baseUrl, token, jsessionId} = useSelector(state => state.auth);

  const url = useMemo(
    () =>
      Platform.OS === 'ios'
        ? versionCheckConfig?.ios
        : versionCheckConfig?.android,
    [versionCheckConfig],
  );

  const apkFile = useMemo(
    () => mobileSettings?.currentApkFile,
    [mobileSettings?.currentApkFile],
  );

  const handleUpdate = useCallback(async () => {
    if (Platform.OS === 'ios' || apkFile == null) {
      linkingProvider.openBrowser(url);
    } else {
      setDownloadAttempted(DOWNLOAD.LOADING);
      await downloadFileOnPhone(
        {fileName: apkFile.fileName, id: apkFile.id, isMetaFile: true},
        {baseUrl, token, jsessionId},
        I18n,
      ).then(setApkDownloaded);
      setDownloadAttempted(DOWNLOAD.ATTEMPTED);
    }
  }, [I18n, apkFile, baseUrl, jsessionId, token, url]);

  const hideUpdateButton = useMemo(
    () =>
      Platform.OS !== 'ios' && apkFile != null
        ? downloadAttempted !== DOWNLOAD.NOT_ATTEMPTED
        : checkNullString(url),
    [apkFile, downloadAttempted, url],
  );

  return (
    <Alert visible={true} title={I18n.t('Base_Information')}>
      <Text style={styles.text}>{I18n.t('Base_MinimalRequiredVersion')}</Text>
      {hideUpdateButton ? (
        downloadAttempted === DOWNLOAD.LOADING ? (
          <ActivityIndicator
            size="large"
            color={Colors.inverseColor.background}
          />
        ) : (
          <Text style={styles.text}>
            {I18n.t(
              downloadAttempted === DOWNLOAD.ATTEMPTED
                ? apkDownloaded
                  ? 'Base_Version_APKDownloaded'
                  : 'Base_Version_APKDownloadFailed'
                : 'Base_Contact_Admin',
            )}
          </Text>
        )
      ) : (
        <Button
          width={BUTTON_WIDTH}
          title={I18n.t('Base_Update')}
          iconName="chevron-double-up"
          onPress={handleUpdate}
        />
      )}
      <Button
        width={BUTTON_WIDTH}
        color={Colors.secondaryColor}
        title={I18n.t('Base_Refresh')}
        iconName="arrow-repeat"
        onPress={onRefresh}
      />
      <Button
        width={BUTTON_WIDTH}
        color={Colors.errorColor}
        title={I18n.t('Base_Logout')}
        iconName="power"
        onPress={() => dispatch(logout())}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    width: '100%',
  },
});

export default PopupMinimalRequiredVersion;
