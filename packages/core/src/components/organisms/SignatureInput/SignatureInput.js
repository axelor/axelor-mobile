import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Signature from 'react-native-signature-canvas';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import FileIcon from './FileIcon';
import PictureIcon from './PictureIcon';
import AOSImage from '../AOSImage/AOSImage';
//import {AnswerCard, FileIcon, PictureIcon} from '../../molecules';

const CAMERA_KEY = 'signature_answer';

const SignatureInput = ({
  signFile,
  base64Src,
  disabled = false,
  onValidate = () => {},
  readSignature = true,
  handleReadSignature = () => {},
}) => {
  const ref = useRef();
  const Colors = useThemeColor();

  const [base64Signature, setBase64Signature] = useState('');
  const [editSignature, setEditSignature] = useState(
    !disabled && signFile?.id == null,
  );

  useEffect(() => {
    if (typeof base64Src === 'string' && base64Src !== '') {
      setBase64Signature(base64Src);
      setEditSignature(false);
    }
  }, [base64Src]);

  useEffect(() => {
    if (readSignature) {
      ref.current.readSignature();
    }
  }, [readSignature]);

  const style = `
    .m-signature-pad {
        font-size: 15px;
        width: 100%;
        height: 100%;
        margin-left: 0;
        margin-top: 0;
        background-color: ${Colors.primaryColor.background};
    }

    .m-signature-pad--footer {
      display: none;
    }`;

  const handleOK = signature => {
    onValidate(signature);
    if (readSignature) {
      handleReadSignature(signature);
    }
  };

  const handleClear = () => {
    setBase64Signature('');
    ref.current.clearSignature();
  };

  const handleSignatureIcons = signatureData => {
    onValidate(signatureData);
    setBase64Signature(signatureData);
  };

  console.log(base64Signature);
  console.log(editSignature);

  return (
    <View style={styles.container}>
      <View style={styles.signatureContainer}>
        {editSignature ? (
          <Signature
            webStyle={style}
            // backgroundColor={Colors.screenBackgroundColor}
            backgroundColor={'red'}
            dataURL={base64Signature}
            ref={ref}
            onOK={handleOK}
            autoClear={false}
          />
        ) : (
          <AOSImage
            imageSize={styles.imageSize}
            metaFile={signFile}
            defaultIconSize={Dimensions.get('window').width * 0.4}
            enableImageViewer={true}
            resizeMode="contain"
          />
        )}
      </View>
      <View>
        {!disabled && (
          <View style={styles.iconContainer}>
            <Icon
              name={editSignature ? 'arrow-counterclockwise' : 'vector-pen'}
              color={Colors.primaryColor.background}
              size={25}
              touchable={true}
              onPress={() => setEditSignature(state => !state)}
              style={styles.icon}
            />
            <FileIcon onChange={handleSignatureIcons} />
            <PictureIcon
              cameraKey={CAMERA_KEY}
              onChange={handleSignatureIcons}
            />
            {editSignature && (
              <Icon
                name="eraser"
                color={Colors.primaryColor.background}
                size={25}
                touchable={true}
                onPress={handleClear}
                style={styles.icon}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  signatureContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'green',
  },
  imageSize: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.4,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  icon: {
    margin: 5,
  },
});

export default SignatureInput;
