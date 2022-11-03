import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  AttachmentCard,
  Chip,
  ChipSelect,
  File,
  HeaderContainer,
  Icon,
  Image,
  PopUpOneButton,
  Screen,
  ScrollList,
  useThemeColor,
} from '@aos-mobile/ui';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import useTranslator from '../../i18n/hooks/use-translator';
import {getAttachedFiles} from '../../features/attachedFilesSlice';

function AttachedFilesView({model, modelId}) {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {baseUrl, token, jsessionId} = useSelector(state => state.auth);
  const {loading, attachedFilesList} = useSelector(
    state => state.attachedFiles,
  );
  const [visible, setVisible] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const [image, setImage] = useState(null);
  const [extensionList, setExtensionList] = useState([]);
  const [selectedExtension, setSelectedExtension] = useState();

  const dispatch = useDispatch();

  const imageContainer = useMemo(() => getStyles(Colors), [Colors]);

  const handleShowImage = item => {
    if (File.getFileExtension(item.fileName) === 'png') {
      setVisible(true);
      setImage({
        uri: `${baseUrl}ws/dms/download/${item?.id}`,
      });
    }
  };

  const handleCloseImage = () => {
    setVisible(false);
    setImage(null);
  };

  const handleShowFile = async item => {
    if (File.getFileExtension(item.fileName) === 'png') {
      handleShowImage(item);
      return;
    }
    const localFile = `${RNFS.DocumentDirectoryPath}/${item?.fileName}`;
    const options = {
      fromUrl: `${baseUrl}ws/dms/inline/${item?.id}`,
      toFile: localFile,
      headers: {
        Cookie: `CSRF-TOKEN=${token}; ${jsessionId}`,
      },
    };

    RNFS.downloadFile(options)
      .promise.then(() =>
        FileViewer.open(localFile, {showOpenWithDialog: true}),
      )
      .then(() => {
        // success
      })
      .catch(error => {
        // error
        console.log(error);
        setErrorFile(true);
      });
  };

  const fetchFilesAPI = useCallback(() => {
    dispatch(
      getAttachedFiles({
        model,
        modelId,
      }),
    );
  }, [dispatch, model, modelId]);

  const desactivateChip = () => {
    setSelectedExtension(null);
  };

  const filterOnSelectExtension = useCallback(
    list => {
      if (list == null || list === [] || !selectedExtension) {
        return list;
      } else {
        return list.filter(
          item => File.getFileExtension(item.fileName) === selectedExtension,
        );
      }
    },
    [selectedExtension],
  );

  const handleSelectExtension = ext => {
    if (selectedExtension === ext) {
      desactivateChip();
    } else {
      setSelectedExtension(ext);
    }
  };

  const filtredList = useMemo(
    () => filterOnSelectExtension(attachedFilesList),
    [filterOnSelectExtension, attachedFilesList],
  );

  useEffect(() => {
    setExtensionList(
      Array.from(
        new Set(
          attachedFilesList?.map(item => File.getFileExtension(item.fileName)),
        ),
      ),
    );
  }, [attachedFilesList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        chipComponent={
          <ChipSelect scrollable={true}>
            {extensionList.map((ext, index) => (
              <Chip
                key={'chip' + index}
                selected={selectedExtension === ext}
                title={`${ext}`.toUpperCase()}
                onPress={() => handleSelectExtension(ext)}
                selectedColor={
                  selectedExtension === ext
                    ? {
                        backgroundColor: Colors.primaryColor_light,
                        borderColor: Colors.primaryColor,
                      }
                    : {
                        backgroundColor: Colors.secondaryColor_light,
                        borderColor: Colors.secondaryColor,
                      }
                }
                width={Dimensions.get('window').width * 0.25}
                marginHorizontal={3}
              />
            ))}
          </ChipSelect>
        }
      />
      {errorFile && (
        <PopUpOneButton
          visible={errorFile}
          title={I18n.t('Auth_Error')}
          data={I18n.t('Auth_CannotOpenFile')}
          btnTitle={I18n.t('Auth_Close')}
          onPress={() => setErrorFile(false)}
        />
      )}
      {visible && image != null && (
        <View style={styles.viewContainer}>
          <Icon
            name="times"
            color={Colors.primaryColor}
            size={24}
            touchable={true}
            onPress={handleCloseImage}
            style={styles.iconContainer}
          />
          <View style={imageContainer}>
            <Image
              defaultIconSize={80}
              generalStyle={styles.imageStyle}
              imageSize={styles.imageSize}
              resizeMode="contain"
              source={image}
            />
          </View>
        </View>
      )}
      <ScrollList
        loadingList={loading}
        data={filtredList}
        renderItem={({item}) => (
          <AttachmentCard
            fileName={item.fileName}
            onPress={() => handleShowFile(item)}
            creationDate={item.createdOn}
            translator={I18n.t}
          />
        )}
        fetchData={fetchFilesAPI}
        filter={true}
        moreLoading={false}
        isListEnd={true}
        translator={I18n.t}
      />
    </Screen>
  );
}

const getStyles = Colors =>
  StyleSheet.create({
    backgroundColor: Colors.backgroundColor,
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
  viewContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 6,
  },
  imageSize: {
    height: 100,
  },
  imageStyle: {
    margin: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 15,
  },
});

export default AttachedFilesView;
