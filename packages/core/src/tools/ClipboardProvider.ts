import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';

class ClipboardProvider {
  constructor() {}

  copyToClipboard(data: string): void {
    try {
      Clipboard.setString(data);
      Toast.show({
        type: 'success',
        position: 'bottom',
        bottomOffset: 20,
        text1: 'Success',
        text2: `${data} successfully copied to clipboard.`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        bottomOffset: 20,
        text1: 'Could not copy element',
        text2: `Error while coping element to clipboard: ${error}.`,
      });
    }
  }

  async fetchCopiedText(): Promise<string> {
    return Clipboard.getString()
      .then((value: string) => value)
      .catch(error => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset: 20,
          text1: 'Error',
          text2: `Error while fetching copied text: ${error}.`,
        });
        return '';
      });
  }
}

export const clipboardProvider = new ClipboardProvider();
