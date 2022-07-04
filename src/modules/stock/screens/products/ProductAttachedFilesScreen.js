import React, {useEffect, useCallback, useState, useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Screen} from '@/components/atoms';
import {fetchProductAttachedFiles} from '../../features/productSlice';
import {AttachmentCard} from '@/components/molecules';
import File from '@/types/file';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {PopUpOneButton, ScrollList} from '@/components/organisms';
import {fetchFileDetails} from '../../api/metafile-api';
import {handleError} from '@/api/utils';
import {ColorHook} from '@/themeStore';

const ProductAttachedFilesScreen = ({route, navigation}) => {
  const Colors = ColorHook();
  const product = route.params.product;
  const {loadingProduct, filesList} = useSelector(state => state.product);
  const [visible, setVisible] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const [image, setImage] = useState(null);
  const [fileDetailsList, setFileDetailsList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductAttachedFiles(product.id));
  }, [dispatch, product.id]);

  useEffect(() => {
    if (filesList == null) {
      return;
    }
    let promises = [];

    async function getFileDetails(fileId) {
      return fetchFileDetails(fileId)
        .catch(function (error) {
          handleError(error, 'fetch meta file details');
        })
        .then(response => response.data.data[0]);
    }

    async function fetchData(file) {
      return await getFileDetails(file.id);
    }

    filesList.forEach(file => {
      promises.push(fetchData(file));
    });

    Promise.all(promises).then(resultes => {
      return setFileDetailsList(resultes);
    });
  }, [filesList]);

  const handleShowImage = item => {
    if (File.getFileExtension(item.fileName) === 'png') {
      setVisible(true);
      setImage({
        uri: `${global.loggedUrl}ws/dms/download/${item?.id}`,
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
    // create a local file path
    const localFile = `${RNFS.DocumentDirectoryPath}/${item?.fileName}`;
    const options = {
      fromUrl: `${global.loggedUrl}ws/dms/inline/${item?.id}`,
      toFile: localFile,
      headers: {
        Cookie: `CSRF-TOKEN=${global.token}; ${global.jsessinId}`,
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
    if (product.id != null) {
      dispatch(fetchProductAttachedFiles(product.id));
    }
  }, [dispatch, product]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product.name,
    });
  }, [navigation, product]);

  const imageContainer = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Screen>
      {errorFile && (
        <PopUpOneButton
          visible={errorFile}
          title="Error"
          data="Cannot open file"
          btnTitle="OK"
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
            <Image style={styles.image} resizeMode="contain" source={image} />
          </View>
        </View>
      )}
      <ScrollList
        loadingList={loadingProduct}
        data={filesList}
        renderItem={({item, index}) => (
          <AttachmentCard
            fileName={item.fileName}
            onPress={() => handleShowFile(item)}
            creationDate={fileDetailsList[index]?.createdOn}
          />
        )}
        fetchData={fetchFilesAPI}
        filter={true}
      />
    </Screen>
  );
};

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
  image: {
    height: 100,
    margin: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 15,
  },
});

export default ProductAttachedFilesScreen;
