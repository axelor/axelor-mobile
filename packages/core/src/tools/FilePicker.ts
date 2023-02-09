import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const handleDocumentSelection = async onChange => {
  try {
    const document = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      allowMultiSelection: false,
      type: 'image/*',
    }).then(documentList => {
      if (documentList == null || documentList.length === 0) {
        return null;
      }
      return documentList[0];
    });

    if (document == null) {
      return onChange(null);
    }
    const fileData = await RNFS.readFile(document.uri, 'base64');
    onChange(`data:${document.type};base64,${fileData}`);
  } catch (err) {
    console.warn(err);
  }
};
