/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Dimensions, Modal, StyleSheet, View} from 'react-native';
import Signature, {SignatureViewRef} from 'react-native-signature-canvas';
import {
  checkNullString,
  Icon,
  Text,
  ThemeColors,
  getCommonStyles,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {handleDocumentSelection} from '../../../tools';
import {deleteMetaFile, uploadBase64} from '../../../api/metafile-api';
import {useSelector} from '../../../redux/hooks';
import {showToastMessage} from '../../../utils';
import {AOSImage} from '../../organisms';
import PictureIcon from './PictureIcon';

const CANVA_HEIGHT = 300;
const POPUP_INPUT_HEIGHT = 100;

interface SignatureInputProps {
  style?: any;
  title?: string;
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
  /**
   * Use this option to use this widget inside a scrollable view to avoid conflicts.
   * Default value is false.
   */
  popup?: boolean;
}

const SignatureInput = ({
  style,
  title,
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
  popup = false,
}: SignatureInputProps) => {
  const ref = useRef<SignatureViewRef>(null);
  const Colors = useThemeColor();

  const {baseUrl, jsessionId, token} = useSelector((state: any) => state.auth);

  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [editSignature, setEditSignature] = useState<boolean>(false);
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setEditSignature(false);
  }, [defaultValue?.id, readonly]);

  const _required = useMemo(
    () => required && defaultValue?.id == null,
    [required, defaultValue?.id],
  );

  const canvaStyle = useMemo(
    () => getCanvaStyles(Colors.screenBackgroundColor),
    [Colors],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );

  const styles = useMemo(
    () => getStyles(Colors, canvaSize, _required),
    [Colors, canvaSize, _required],
  );

  const handleClose = useCallback(() => {
    popup && setPopupIsOpen(false);
    setEditSignature(false);
    setUnsavedChanges(false);
  }, [popup]);

  const handleSave = useCallback(() => {
    ref.current.readSignature();
  }, []);

  const handleClear = useCallback(() => {
    ref.current.clearSignature();
    setUnsavedChanges(false);
  }, []);

  const handleFileDelete = useCallback(
    async (sendChange = true) => {
      if (defaultValue?.id != null) {
        try {
          await deleteMetaFile(defaultValue?.id);
        } catch (error) {
          console.log('Could not delete the file:', error);
        }
      }

      if (sendChange) {
        onChange(null);
      }
    },
    [defaultValue?.id, onChange],
  );

  const handleUpload = useCallback(
    async (file: any) => {
      try {
        handleClose();
        handleFileDelete(false);

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
        showToastMessage({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: `Could not upload the file.\n${error}`,
          onPress: () => {},
        });
      }
    },
    [
      baseUrl,
      handleClose,
      handleFileDelete,
      jsessionId,
      onChange,
      returnBase64String,
      token,
    ],
  );

  const handleSignature = useCallback(
    (fullBase64: string) => {
      const [_type, base64] = fullBase64.split(';base64,');
      const type = _type.replace('data:', '');
      const extension = type.split('/')[1];
      const numberEquals = [...(base64.slice(-2).matchAll(/[=]/g) ?? [])]
        .length;
      const size = (base64.length * 3) / 4 - numberEquals;

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

  const containerStyle = useMemo(
    () => [
      commonStyles.filter,
      commonStyles.filterAlign,
      styles.contentContainer,
      unsavedChanges ? commonStyles.inputFocused : null,
    ],
    [commonStyles, styles, unsavedChanges],
  );

  const renderSignatureCanva = () => {
    return (
      <View style={containerStyle}>
        <View style={styles.signatureContainer}>
          <Signature
            webStyle={canvaStyle}
            backgroundColor={Colors.screenBackgroundColor}
            dataURL={returnBase64String ? defaultValue : null}
            ref={ref}
            onOK={handleSignature}
            onBegin={() => setUnsavedChanges(true)}
            autoClear={false}
          />
        </View>
        <View style={styles.iconContainer}>
          <Icon
            name="x-lg"
            size={iconSize}
            touchable={true}
            onPress={handleClose}
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
            touchable={unsavedChanges}
            color={
              unsavedChanges
                ? Colors.successColor.background
                : Colors.secondaryColor.background
            }
            onPress={handleSave}
            style={styles.icon}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      {editSignature &&
        (popup ? (
          <Modal visible={popupIsOpen} transparent animationType="fade">
            <View style={styles.modalBackground}>{renderSignatureCanva()}</View>
          </Modal>
        ) : (
          renderSignatureCanva()
        ))}
      {(!editSignature || popup) && (
        <View style={containerStyle}>
          <View
            style={[
              styles.signatureContainer,
              popup && {height: POPUP_INPUT_HEIGHT},
            ]}>
            <AOSImage
              imageSize={[
                styles.signatureContainer,
                popup && {height: POPUP_INPUT_HEIGHT},
              ]}
              metaFile={returnBase64String ? null : defaultValue}
              defaultIconSize={
                popup ? POPUP_INPUT_HEIGHT * 0.5 : canvaSize * 0.5
              }
              enableImageViewer={true}
              resizeMode="contain"
            />
          </View>
          {!readonly && (
            <View style={styles.iconContainer}>
              <Icon
                name="vector-pen"
                size={iconSize}
                touchable={true}
                onPress={() => {
                  popup && setPopupIsOpen(true);
                  setEditSignature(true);
                }}
                style={styles.icon}
              />
              <Icon
                name="trash3-fill"
                visible={defaultValue?.id != null}
                size={iconSize}
                touchable={true}
                color={Colors.errorColor.background}
                onPress={handleFileDelete}
                style={styles.icon}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors, canvaSize: any, required: boolean) =>
  StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
    },
    contentContainer: {
      height: null,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderColor: required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
    },
    signatureContainer: {
      width: canvaSize,
      height: CANVA_HEIGHT,
      justifyContent: 'center',
    },
    iconContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
      marginLeft: 5,
    },
    icon: {
      marginVertical: 5,
    },
    title: {
      marginLeft: 10,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });

const getCanvaStyles = (backgroundColor: string) => {
  return `
  .m-signature-pad {
      font-size: 15px;
      width: 100%;
      height: 100%;
      margin-left: 0;
      margin-top: 0;
      background-color: ${backgroundColor};
  }

  .m-signature-pad--footer {
    display: none;
  }`;
};

export default SignatureInput;
