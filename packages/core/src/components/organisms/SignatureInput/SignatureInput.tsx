/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Signature, {SignatureViewRef} from 'react-native-signature-canvas';
import {
  Icon,
  ThemeColors,
  getCommonStyles,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {handleDocumentSelection} from '../../../tools';
import {uploadBase64} from '../../../api/metafile-api';
import {useSelector} from '../../../redux/hooks';
import {AOSImage} from '../../organisms';
import PictureIcon from './PictureIcon';

const SignatureInput = ({
  style,
  defaultValue,
  readonly = false,
  required = false,
  onChange = () => {},
  enableFileSelection = true,
  enablePicture = true,
  cameraKey = 'signature_answer',
  canvaSize = Dimensions.get('window').width * 0.75,
  returnBase64String = false,
  iconSize = 25,
}: {
  style?: any;
  defaultValue?: any;
  readonly?: boolean;
  required?: boolean;
  onChange: (value: any) => void;
  enableFileSelection?: boolean;
  enablePicture?: boolean;
  cameraKey?: string;
  canvaSize?: any;
  returnBase64String?: boolean;
  iconSize?: number;
}) => {
  const ref = useRef<SignatureViewRef>();
  const Colors = useThemeColor();

  const {baseUrl, jsessionId, token} = useSelector((state: any) => state.auth);

  const [editSignature, setEditSignature] = useState<boolean>(
    !readonly && defaultValue?.id == null,
  );

  useEffect(() => {
    setEditSignature(defaultValue?.id == null);
  }, [defaultValue?.id]);

  const canvaStyle = useMemo(
    () => `
  .m-signature-pad {
      font-size: 15px;
      width: 100%;
      height: 100%;
      margin-left: 0;
      margin-top: 0;
      background-color: ${Colors.screenBackgroundColor};
  }

  .m-signature-pad--footer {
    display: none;
  }`,
    [Colors],
  );

  const _required = useMemo(
    () => required && defaultValue?.id == null,
    [required, defaultValue],
  );

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const styles = useMemo(
    () => getStyles(Colors, canvaSize, _required),
    [Colors, canvaSize, _required],
  );

  const handleUpload = useCallback(
    async (file: any) => {
      try {
        if (returnBase64String) {
          onChange(file.fullBase64);
          return;
        }

        const response = await uploadBase64(file, {
          baseUrl,
          token,
          jsessionId,
        });

        onChange(response);
      } catch (error) {
        console.log('Could not upload the file:', error);
      }
    },
    [baseUrl, jsessionId, onChange, returnBase64String, token],
  );

  const handleSignature = useCallback(
    (fullBase64: string) => {
      const [_type, base64] = fullBase64.split(';base64,');
      const type = _type.replace('data:', '');
      const extension = type.split('/')[1];
      const size =
        (base64.length * 3) / 4 - (base64.slice(-2) === '==' ? 2 : 1);

      handleUpload({
        fullBase64,
        base64,
        name: `signature.${extension}`,
        type,
        dateTime: new Date().toISOString(),
        size,
      });
    },
    [handleUpload],
  );

  const handleSave = useCallback(() => {
    ref.current.readSignature();
  }, []);

  const handleClear = useCallback(() => {
    ref.current.clearSignature();
  }, []);

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        commonStyles.filterSize,
        styles.container,
        style,
      ]}>
      <View style={styles.signatureContainer}>
        {!readonly && editSignature ? (
          <Signature
            webStyle={canvaStyle}
            backgroundColor={Colors.screenBackgroundColor}
            dataURL={returnBase64String ? defaultValue : null}
            ref={ref}
            onOK={handleSignature}
            autoClear={false}
          />
        ) : (
          <AOSImage
            imageSize={styles.signatureContainer}
            metaFile={returnBase64String ? null : defaultValue}
            defaultIconSize={canvaSize * 0.5}
            enableImageViewer={true}
            resizeMode="contain"
          />
        )}
      </View>
      {!readonly && !editSignature ? (
        <View style={styles.iconContainer}>
          <Icon
            name="vector-pen"
            size={iconSize}
            touchable={true}
            onPress={() => setEditSignature(true)}
            style={styles.icon}
          />
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <Icon
            name="x-lg"
            size={iconSize}
            touchable={true}
            onPress={() => setEditSignature(false)}
            style={styles.icon}
          />
          <View style={styles.icon} />
          <Icon
            name="upload"
            size={iconSize}
            style={styles.icon}
            touchable={true}
            visible={enableFileSelection}
            onPress={() => handleDocumentSelection(handleUpload)}
          />
          {enablePicture && (
            <PictureIcon
              style={styles.icon}
              size={iconSize}
              cameraKey={cameraKey}
              onChange={handleUpload}
            />
          )}
          <Icon
            name="eraser"
            size={iconSize}
            touchable={true}
            onPress={handleClear}
            style={styles.icon}
          />
          <Icon
            name="check-lg"
            size={iconSize}
            touchable={true}
            onPress={handleSave}
            style={styles.icon}
          />
        </View>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors, canvaSize: any, required: boolean) =>
  StyleSheet.create({
    container: {
      height: null,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderColor: required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
    },
    signatureContainer: {
      width: canvaSize,
      height: 300,
      justifyContent: 'center',
    },
    iconContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
    },
    icon: {
      margin: 5,
    },
  });

export default SignatureInput;
